import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import SU from '../elements/SelectableUnit.js';
import AccountActionBar from '../elements/AccountActionBar.js';
import ContractActionBar from '../elements/ContractActionBar.js';
import NotFound from './NotFound.js';

import SecurityIcon from '../elements/SecurityIcon.js';
import * as Utils from '../../utils/utils.js';
import * as Helpers from '../../utils/helperFunctions.js';
import LatestTransactions from '../elements/LatestTransactions.js';
import shortid from 'shortid';

import * as Actions from '../../actions/actions.js';

export class SingleAccountView extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.watchContractEvents = this.watchContractEvents.bind(this);
    this.toggleContractInfo = this.toggleContractInfo.bind(this);
    this.displayEventModal = this.displayEventModal.bind(this);
    this.setState({ showContractFunctions: true });
  }

  // shouldComponentUpdate(prevProps, prevState) {
  //   if(this.props.reducers.selectedWallet !== prevProps.reducers.selectedWallet) {
  //     return true
  //   }
  //   else if(this.props.reducers.selectedContract !== prevProps.reducers.selectedContract) {
  //     return true
  //   }
  //   else {
  //     return false;
  //   }
  //   // else if (this.props.reducers.ObservedContracts[contract.address].logs;)
  // }

  componentDidMount() {
    this.setState({ displaySU: false });
  }

  componentWillUnmount() {
    console.log('unmounting');
  }

  toggleSU() {
    if (this.state.displaySU === undefined) this.setState({ displaySU: false });
    else {
      this.state.displaySU
        ? this.setState({ displaySU: false })
        : this.setState({ displaySU: true });
    }
  }

  displayEventModal(e, log) {
    // log['originalContract'] = this.props.reducers.
    log['originalContractName'] = this.props.reducers.selectedContract.contract[
      'contract-name'
    ];
    log[
      'originalContractAddress'
    ] = this.props.reducers.selectedContract.contract.address;

    this.props.updateSelectedEvent(log);
    this.props.displayModal('displayEventInfo');
  }

  /**
  Watches custom events

  @param {Object} contract the account object with .jsonInterface
  */
  watchContractEvents(e, contract) {
    let web3;
    if (this.props.web3 && this.props.web3.web3Instance) {
      web3 = this.props.web3.web3Instance;
    } else {
      return;
    }

    console.log(contract);

    let contractInstance = new web3.eth.Contract(
      JSON.parse(contract.jsonInterface),
      contract.address
    );
    console.log(contractInstance);
    let contractFunctions = [];
    let contractConstants = [];
    JSON.parse(contract.jsonInterface).map(func => {
      if (func.type == 'function') {
        func.constant
          ? contractConstants.push(func)
          : contractFunctions.push(func);
      }
    });

    this.props.addContractFunctions({
      address: contract.address,
      value: contractFunctions,
      name: 'contractFunctions',
    });
    this.props.addContractConstants({
      address: contract.address,
      value: contractConstants,
      name: 'contractConstants',
    });

    //TODO indicate block range
    let subscription = contractInstance.events.allEvents({});

    contractInstance.getPastEvents('allEvents', (error, logs) => {
      if (!error && logs.length > 0) {
        logs.map(log => {
          web3.eth.getBlock(log.blockNumber, (err, res) => {
            // convert to milliseconds
            log['timestamp'] = new Date(res.timestamp * 1000);
            this.props.addPastContractLogs(log);
          });
        });
      } else {
        console.warn('error', error);
        //TODO: global notification
      }
    });

    subscription.on('data', log => {
      web3.eth.getBlock(log.blockNumber, (err, res) => {
        if (err) console.warn(err);
        if (res) {
          // convert to milliseconds
          log['timestamp'] = new Date(res.timestamp * 1000);
          this.props.updateContractLog(log);
        }
      });
    });
  }

  toggleContractInfo(e) {
    console.log('here intoggleContractInfo', e);
    this.setState({ showContractFunctions: !this.state.showContractFunctions });
  }

  renderContractFunctions() {
    let contract = this.props.reducers.selectedContract.contract;
    let functions = this.props.reducers.ObservedContracts[contract.address]
      .contractFunctions;
    let constants = this.props.reducers.ObservedContracts[contract.address]
      .contractConstants;
    let show = this.state.showContractFunctions;
    let divStyle;
    show === undefined || show
      ? (divStyle = { display: 'block' })
      : (divStyle = { display: 'none' });
    return (
      <div className="execute-contract">
        <button
          className="toggle-visibility dapp-block-button dapp-small"
          onClick={e => this.toggleContractInfo(e)}
        >
          Hide contract info
        </button>
        <div className="dapp-clear-fix" />
        <div className="row clear" style={divStyle}>
          <div className="col col-8 mobile-full contract-info">
            <h2>Read from contract</h2>
            <table className="contract-constants dapp-zebra">
              <tbody>
                {constants
                  ? constants.map(func => (
                      <React.Fragment>
                        <tr>
                          <td>
                            <h3>{Helpers.toSentence(func.name)}</h3>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <dl
                              className={
                                'constant-' + func.name + ' dapp-zebra'
                              }
                            >
                              <dd className="output">
                                {Helpers.toSentence(func.name)}
                                <br />
                              </dd>
                            </dl>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                  : ''}
              </tbody>
            </table>
          </div>
          <div className="col col-4 mobile-full contract-functions">
            <h2>Write to contract</h2>
            <h4>Select Function</h4>
            <select
              className="select-contract-function"
              name="select-contract-function"
            >
              <option disabled="">Pick a function</option>
              {functions
                ? functions.map(c => (
                    <option value={c.name}>
                      {Helpers.toSentence(c.name, true)}
                    </option>
                  ))
                : ''}
            </select>
          </div>
        </div>
      </div>
    );
  }

  renderContractEvents() {
    let contract = this.props.reducers.selectedContract.contract;
    let logs = this.props.reducers.ObservedContracts[contract.address].logs;

    return (
      <table className="dapp-zebra transactions">
        <tbody>
          {logs.map(log => (
            <tr
              key={shortid.generate()}
              onClick={e => {
                this.displayEventModal(e, log);
              }}
              data-transaction-hash={log.transactionHash}
              data-block-hash={log.blockHash}
            >
              <td
                className="time simptip-position-right simptip-movable"
                data-tooltip="//TODO: get timestamp"
              >
                <h2>{Utils.getMonthName(log.timestamp)}</h2>
                <p>{Utils.getDate(log.timestamp)}</p>
              </td>
              <td className="account-name">
                <h2>{log.event}</h2>
                <p style={{ wordBreak: 'break-word' }}>
                  {Object.keys(log.returnValues).map(
                    (val, i) =>
                      isNaN(val) ? (
                        <React.Fragment>
                          {val} : &nbsp;{' '}
                          <strong> {log.returnValues[val]}</strong>
                          <br />
                        </React.Fragment>
                      ) : null
                  )}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  renderSingleContract() {
    let contract = this.props.reducers.selectedContract.contract;
    let logs = this.props.reducers.ObservedContracts[contract.address].logs;
    return (
      <div className="dapp-container accounts-page">
        <div className="dapp-sticky-bar dapp-container" />
        <div className="accounts-page-summary">
          <SecurityIcon
            type="singleAccountView"
            classes="dapp-identicon"
            hash={contract.address}
          />
          <header>
            <h1>
              <em className="edit-name">{contract['contract-name']}</em>
              <i className="edit-icon icon-pencil" />
            </h1>
            <h2 className="copyable-address">
              <i className="icon-key" title="Account" />
              <span>{contract.address}</span>
            </h2>
            <div className="clear" />
            {/*<span title="This is testnet ether, no real market value">ETHER*</span>*/}
            <span className="account-balance">
              {this.props.web3 && this.props.web3.web3Instance
                ? Utils.displayPriceFormatter(this.props, contract.balance)
                : contract.balance}

              {contract.balance}
            </span>
          </header>
          <table className="token-list dapp-zebra">
            <tbody />
          </table>
          <div className="accounts-transactions">
            <h2>Latest events</h2>
            <br />
            <div>
              <input
                type="checkbox"
                id="watch-events-checkbox"
                className="toggle-watch-events"
                onClick={e => this.watchContractEvents(e, contract)}
              />
              <label htmlFor="watch-events-checkbox">
                Watch contract events
              </label>
            </div>
            <br />
            <input
              type="text"
              className="filter-transactions"
              placeholder="Filter events"
            />
          </div>
        </div>
        <ContractActionBar props={contract} />
        {logs && logs.length > 0 ? this.renderContractFunctions() : ''}
        {logs && logs.length > 0 ? this.renderContractEvents() : ''}
      </div>
    );
  }

  renderAccountTransactions() {
    let sw = this.props.reducers.selectedWallet;
    let address = sw.address;
    let transactions = this.props.reducers.Transactions;
    let accountTxns = {};
    Object.keys(transactions).map(hash => {
      if (hash === address) {
        accountTxns[address] = transactions[hash];
      }
      return null;
    });
    return (
      <div className="accounts-transactions">
        {accountTxns !== {} ? (
          <LatestTransactions transactions={accountTxns} />
        ) : (
          <div>No transactions found...</div>
        )}
      </div>
    );
  }

  renderSingleAccount() {
    let sw = this.props.reducers.selectedWallet;
    return (
      <div className="dapp-container accounts-page">
        <div className="dapp-sticky-bar dapp-container" />
        <div className="accounts-page-summary">
          <SecurityIcon
            type="singleAccountView"
            classes="dapp-identicon"
            hash={sw.address}
          />
          <header>
            <h1>
              <span>Account {sw.number}</span>
              <em className="edit-name">Account {sw.number}</em>
              <i className="edit-icon icon-pencil" />
            </h1>
            <h2 className="copyable-address">
              <i className="icon-key" title="Account" />
              <span>{sw.address}</span>
            </h2>
            <div className="clear" />
            <span className="account-balance">
              {this.props.web3 && this.props.web3.web3Instance
                ? Utils.displayPriceFormatter(this.props, sw.wallet)
                : sw.wallet}
              <span className="inline-form" name="unit">
                <button
                  type="button"
                  data-name="unit"
                  data-value={this.props.reducers.currency}
                  onClick={() => this.toggleSU()}
                >
                  {this.props.reducers.currency}
                </button>
                <SU displaySU={this.state.displaySU} />
              </span>
            </span>
            {/* Account infos */}
            <div className="account-info">
              <h3>NOTE </h3>
              <p>
                Accounts can't display incoming transactions, but can receive,
                hold and send Ether. To see incoming transactions create a
                wallet contract to store ether.
              </p>
              <p>
                If your balance doesn't seem updated, make sure that you are in
                sync with the network.
              </p>
            </div>
          </header>
        </div>
        <AccountActionBar props={sw} />
        {this.renderAccountTransactions()}
      </div>
    );
  }

  render() {
    let w = this.props.reducers.selectedWallet;
    let c = this.props.reducers.selectedContract;
    return w === undefined || w === '' ? (
      c === undefined || c === '' ? (
        <NotFound />
      ) : (
        this.renderSingleContract()
      )
    ) : (
      this.renderSingleAccount()
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(SingleAccountView);
