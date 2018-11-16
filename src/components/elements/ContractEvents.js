import React, { Component } from 'react';
import { connect } from 'react-redux';
import SecurityIcon from '../elements/SecurityIcon.js';
import * as Utils from '../../utils/utils.js';
import * as Helpers from '../../utils/helperFunctions.js';
import * as Actions from '../../actions/actions.js';
import shortid from 'shortid';

const DateFormat = props => {
  return (
    <td
      className="time simptip-position-right simptip-movable"
      data-tooltip="//TODO: get timestamp"
    >
      <h2>{Utils.getMonthName(props.log.timestamp)}</h2>
      <p>{Utils.getDate(props.log.timestamp)}</p>
    </td>
  );
};

const LogValue = props => {
  return (
    <p key={shortid.generate()} style={{ wordBreak: 'break-word' }}>
      {props.val} : &nbsp; <strong> {props.log.returnValues[props.val]}</strong>
      <br />
    </p>
  );
};

const Event = props => {
  return (
    <td className="account-name">
      <h2>{props.log.event}</h2>
      {Object.keys(props.log.returnValues).map((val, i) =>
        isNaN(val) ? <LogValue log={props.log} val={val} /> : null
      )}
    </td>
  );
};

export class ContractEvents extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.displayEventModal = this.displayEventModal.bind(this);
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
              <DateFormat log={log} />
              <Event log={log} />
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
