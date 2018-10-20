import React, { Component } from 'react';
import { connect } from 'react-redux';
import SU from '../elements/SelectableUnit.js';
import ContractActionBar from '../elements/ContractActionBar.js';
import ExecutableContract from '../elements/ExecutableContract.js';
import ContractEvents from '../elements/ContractEvents.js';
import NotFound from './NotFound.js';
import SecurityIcon from '../elements/SecurityIcon.js';
import * as Utils from '../../utils/utils.js';
import * as Helpers from '../../utils/helperFunctions.js';
import * as Actions from '../../actions/actions.js';
import shortid from 'shortid';

export class SingleContractView extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.watchContractEvents = this.watchContractEvents.bind(this);
    this.toggleContractInfo = this.toggleContractInfo.bind(this);
    this.displayEventModal = this.displayEventModal.bind(this);
    this.chooseFunction = this.chooseFunction.bind(this);
    this.setState({ showContractFunctions: true });
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

  displayEventModal(e, log) {
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
    let contractInstance = new web3.eth.Contract(
      JSON.parse(contract.jsonInterface),
      contract.address
    );

    // should i bag this and instead of push to array, redux it and set key to function name?
    //START
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
    // END
    console.log(contractConstants);
    // TODO: NOT UPDATING STATE
    contractConstants.map((method, index) => {
      let args = method.inputs.map(input => {
        input.typeShort = input.type.match(/[a-z]+/i)[0];
        input.value === undefined || input.value === null
          ? (input['value'] = '')
          : null;
        if (input.typeShort === 'bytes' && input.value === '') {
          input.value = '0x0000000000000000000000000000000000000000';
        } else if (input.value === '' && input.typeShort !== 'address') {
          input.value = '0x00';
        }
        return input.value;
      });
      contractInstance.methods[method.name](...args).call((err, res) => {
        err
          ? ((method.outputs[0].value = ''),
            console.warn('error in contract call', err))
          : method.outputs.length === 1
            ? (method.outputs[0].value = res)
            : method.outputs.map(
                (output, i) => (method.outputs[i].value = res[i])
              );
      });
      // TODO: NOT UPDATING STATE
      // this.props.updateInitialContractMethodOutputs({
      //   contractAddress: contract.address,
      //   name: method.name,
      //   index: index,
      //   value: method.outputs,
      //   location: contractConstants,
      // })
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

  renderFunctionInputs() {
    let contract = this.props.reducers.selectedContract.contract;
    let functions = this.props.reducers.ObservedContracts[contract.address]
      .contractFunctions;

    let inputs = this.props.reducers.selectedFunction.inputs;
    // .inputs
    console.log(inputs);
    return (
      <React.Fragment>
        {inputs !== undefined
          ? inputs.map(input => {
              <React.Fragment>
                <h4>
                  {Helpers.toSentence(input.name)}><em>- {input.type}</em>
                </h4>
                <input
                  type="number"
                  step="1"
                  placeholder="-123"
                  name="elements_input_int"
                />
              </React.Fragment>;
            })
          : null}
      </React.Fragment>
    );
  }

  chooseFunction(e) {
    let contract = this.props.reducers.selectedContract.contract;
    let functions = this.props.reducers.ObservedContracts[contract.address];
    let func = functions.contractFunctions[e.target.selectedIndex - 1];
    if (func.name === e.target.value) {
      func['contractAddress'] = contract.address;
      this.props.updateSelectedFunction(func);
    } else {
      //TODO: global
    }
  }

  renderExecuteFunctions() {
    let contract = this.props.reducers.selectedContract.contract;
    let functions = this.props.reducers.ObservedContracts[contract.address]
      .contractFunctions;
    return (
      <div className="col col-4 mobile-full contract-functions">
        <h2>Write to contract</h2>
        <h4>Select Function</h4>
        <select
          className="select-contract-function"
          name="select-contract-function"
          onChange={e => this.chooseFunction(e)}
        >
          <option disabled="">Pick a function</option>
          {functions
            ? functions.map((c, i) => (
                <option value={c.name}>
                  {Helpers.toSentence(c.name, true)}
                </option>
              ))
            : ''}
        </select>
      </div>
    );
  }

  toggleContractInfo(e) {
    console.log('here intoggleContractInfo', e);
    this.setState({ showContractFunctions: !this.state.showContractFunctions });
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
        {logs && logs.length ? <ExecutableContract /> : ''}
        {logs && logs.length ? <ContractEvents /> : ''}
        {/*{logs && logs.length > 0 ? this.renderContractFunctions() : ''}*/}
        {/*{logs && logs.length > 0 ? this.renderContractEvents() : ''}*/}
      </div>
    );
  }

  render() {
    let c = this.props.reducers.selectedContract;
    return c === undefined || c === '' ? (
      <NotFound />
    ) : (
      this.renderSingleContract()
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(SingleContractView);