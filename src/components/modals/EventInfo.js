import React, { Component } from 'react';
import { connect } from 'react-redux';
import SecurityIcon from '../elements/SecurityIcon.js';
import * as Actions from '../../actions/actions.js';
import * as Utils from '../../utils/utils.js';

import { Identicon } from 'ethereum-react-components';

export const EventName = event => {
  return (
    <tr>
      <td>Event name</td>
      <td>{event.event}</td>
    </tr>
  );
};

export const Outputs = event => {
  return (
    <tr>
      <td>Return Values</td>
      <td style={{ wordBreak: 'break-word' }}>
        from: <strong>{event.returnValues.from}</strong>
        <br />
        to: <strong>{event.returnValues.to}</strong>
        <br />
        tokenId: <strong>{event.returnValues.tokenId}</strong>
        <br />
      </td>
    </tr>
  );
};

export const Origin = event => {
  return (
    <tr>
      <td>Origin Contract</td>
      <td>
        <Identicon size="tiny" address={event.originalContractAddress} />
        {event.originalContractName}
      </td>
    </tr>
  );
};

export class EventInfo extends Component {
  constructor() {
    super();
    this.closeModal = this.closeModal.bind(this);
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (
      this.props.event !== prevProps.event ||
      this.props.display !== prevProps.display
    ) {
      return true;
    }
    return false;
  }

  closeModal(e) {
    e.preventDefault();
    if (e.target.getAttribute('id') === 'viewEventInfo') {
      this.props.closeModal('displayEventInfo');
    }
  }

  render() {
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    let event = this.props.event;
    console.log(event);
    return (
      <div
        className={this.props.display}
        style={divStyle}
        onClick={e => this.closeModal(e)}
        id="viewEventInfo"
      >
        <section className="dapp-modal-container transaction-info">
          <h1>Event</h1>
          <p>
            {Utils.getFullTime(event.timestamp)}
            <br />
            <small>{Utils.timeFromNow(event.timestamp)}</small>
          </p>
          <table className="dapp-zebra">
            <tbody>
              <EventName event={event} />
              <Outputs event={event} />
              <Origin event={event} />
              {/*}
              <tr>
                <td>Event name</td>
                <td>{event.event}</td>
              </tr>
              <tr>
                <td>Return Values</td>
                <td style={{ wordBreak: 'break-word' }}>
                  from: <strong>{event.returnValues.from}</strong>
                  <br />
                  to: <strong>{event.returnValues.to}</strong>
                  <br />
                  tokenId: <strong>{event.returnValues.tokenId}</strong>
                  <br />
                </td>
              </tr>
              <tr>
                <td>Origin Contract</td>
                <td>
                  <Identicon size="tiny" address={event.originalContractAddress} />
                  {event.originalContractName}
                </td>
              </tr>
              <tr>
                <td>Log index</td>
                <td>{event.logIndex}</td>
              </tr>
              <tr>
                <td>Transaction index</td>
                <td>{event.transactionIndex}</td>
              </tr>
              <tr>
                <td>Transaction Hash</td>
                <td>
                  <a
                    href={'http://etherscan.io/tx/' + event.transactionHash}
                    target="_blank"
                  >
                    {event.transactionHash}
                  </a>
                </td>
              </tr>
              <tr>
                <td>Block</td>
                <td>
                  <a
                    href={'http://etherscan.io/block/' + event.blockHash}
                    title={event.blockHash}
                    target="_blank"
                    className="dapp-shorten-text"
                  >
                    {event.blockNumber}
                    <br />
                    {event.blockHash}
                  </a>
                </td>
              </tr>
            */}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(EventInfo);
