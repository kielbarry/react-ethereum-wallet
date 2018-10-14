import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventInfo extends Component {
  constructor(props) {
    super(props);
    this.cancelFunction = this.cancelFunction.bind(this);
  }

  render() {
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    return (
      <div
        className={this.props.display}
        style={divStyle}
        name="views_modals_eventInfo"
      >
        ><h1>title</h1>
        <p>
          timestamp
          <br />
          <small>
            timestamp fromNow if confirmations 1000
            <strong>confirmations</strong>
            confirmations
          </small>
        </p>
        <table class="dapp-zebra">
          <tbody>
            <tr>
              <td>event name</td>
              <td>the event</td>
            </tr>
            <tr>
              <td>Return Values</td>
              <td style="word-break: break-word;">
                nameValue: <strong>value</strong>
                <br />
              </td>
            </tr>

            <tr>
              <td>contract o origin</td>
              <td>address</td>
            </tr>
            <tr>
              <td>log index</td>
              <td>log index</td>
            </tr>
            <tr>
              <td>trransaction index</td>
              <td>transactionIndex</td>
            </tr>
            <tr>
              <td>Transaction Hash</td>
              <td>
                <a href="http://etherscan.io/tx/" target="_blank">
                  hash substring
                </a>
              </td>
            </tr>
            <tr>
              <td>event block</td>
              <td>
                <a
                  href="http://etherscan.io/block/"
                  title="blockhash"
                  target="_blank"
                  class="dapp-shorten-text"
                >
                  blocknumber
                  <br />
                  blocknumber substring
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  null
)(EventInfo);

<div name="views_modals_eventInfo">
  <h1>title</h1>
  <p>
    timestamp
    <br />
    <small>
      timestamp fromNow if confirmations 1000
      <strong>confirmations</strong>
      confirmations
    </small>
  </p>
  <table class="dapp-zebra">
    <tbody>
      <tr>
        <td>event name</td>
        <td>the event</td>
      </tr>
      <tr>
        <td>Return Values</td>
        <td style="word-break: break-word;">
          nameValue: <strong>value</strong>
          <br />
        </td>
      </tr>

      <tr>
        <td>contract o origin</td>
        <td>address</td>
      </tr>
      <tr>
        <td>log index</td>
        <td>log index</td>
      </tr>
      <tr>
        <td>trransaction index</td>
        <td>transactionIndex</td>
      </tr>
      <tr>
        <td>Transaction Hash</td>
        <td>
          <a href="http://etherscan.io/tx/" target="_blank">
            hash substring
          </a>
        </td>
      </tr>
      <tr>
        <td>event block</td>
        <td>
          <a
            href="http://etherscan.io/block/"
            title="blockhash"
            target="_blank"
            class="dapp-shorten-text"
          >
            blocknumber
            <br />
            blocknumber substring
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>;
