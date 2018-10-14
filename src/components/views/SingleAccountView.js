import React, { Component } from 'react';
import { connect } from 'react-redux';

import SU from '../elements/SelectableUnit.js';
import AccountActionBar from '../elements/AccountActionBar.js';
import ContractActionBar from '../elements/ContractActionBar.js';
import NotFound from './NotFound.js';

import SecurityIcon from '../elements/SecurityIcon.js';
import * as Utils from '../../utils/utils.js';
import * as Helpers from '../../utils/helperFunctions.js';
import LatestTransactions from '../elements/LatestTransactions.js';

import * as Actions from '../../actions/actions.js';

export class SingleAccountView extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.watchContractEvents = this.watchContractEvents.bind(this);
  }
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

  /**
  Watches custom events

  @param {Object} contract the account object with .jsonInterface
  */
  watchContractEvents(e, contract) {
    console.log('here in watchContractEvents', e);
    console.log('contract', contract);
    let web3;
    if (this.props.web3 && this.props.web3.web3Instance) {
      web3 = this.props.web3.web3Instance;
    } else {
      return;
    }

    console.log(contract.jsonInterface);
    let contractInstance = new web3.eth.Contract(
      JSON.parse(contract.jsonInterface),
      contract.address
    );
    //TODO: block to checback on?
    console.log(
      'EVENT LOG:  Checking Custom Contract Events for ' +
        contract.address +
        ' (_id: ' +
        'todo: create and supply an id' +
        ') from block # ' +
        'todo: find blocktocheckback'
    );

    //TODO: delete the last logs until block -500

    let subscription = contractInstance.events.allEvents({
      // fromBlock: blockToCheckBack,
      // toBlock: 'latest'
    });

    contractInstance.getPastEvents('allEvents', (error, logs) => {
      if (!error) {
        // update last checkpoint block
        console.log('the logs in get past events', logs);
        contract['logs'] = logs;
        console.log(contract);
        this.props.addPastContractLogs(contract);

        // CustomContracts.update(
        //   { _id: newDocument._id },
        //   {
        //     $set: {
        //       checkpointBlock:
        //         (currentBlock || EthBlocks.latest.number) -
        //         ethereumConfig.rollBackBy
        //     }
        //   }
        // );
      }
    });

    subscription.on('data', log => {
      let id = Helpers.makeId(
        'log',
        web3.utils.sha3(
          log.logIndex + 'x' + log.transactionHash + 'x' + log.blockHash
        )
      );
      console.log('the log id', id);
      console.log('the log', log);
    });

    console.log(subscription);
  }

  renderSingleContract() {
    let contract = this.props.reducers.selectedContract.contract;

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
            <table className="dapp-zebra transactions">
              <tbody>
                <tr className="full-width">
                  <td colSpan="3">No matching transaction found.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <ContractActionBar props={contract} />
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
    // let r = this.props.reducers;

    return this.props.reducers.selectedWallet === undefined ? (
      this.props.reducers.selectedContract === undefined ? (
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
