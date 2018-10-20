import React, { Component } from 'react';
import { connect } from 'react-redux';
import SecurityIcon from '../elements/SecurityIcon.js';
import * as Utils from '../../utils/utils.js';
import * as Helpers from '../../utils/helperFunctions.js';
import * as Actions from '../../actions/actions.js';
import shortid from 'shortid';

export class ContractEvents extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.displayEventModal = this.displayEventModal.bind(this);
    this.watchContractEvents = this.watchContractEvents.bind(this);
    this.setState({ showContractFunctions: true });
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

  render() {
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
                {Object.keys(log.returnValues).map(
                  (val, i) =>
                    isNaN(val) ? (
                      <p
                        key={shortid.generate()}
                        style={{ wordBreak: 'break-word' }}
                      >
                        {val} : &nbsp; <strong> {log.returnValues[val]}</strong>
                        <br />
                      </p>
                    ) : null
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(ContractEvents);
