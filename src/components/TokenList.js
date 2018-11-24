import React, { Component } from 'react';
import { connect } from 'react-redux';
import SecurityIcon from './elements/SecurityIcon';

class TokenList extends Component {
  render() {
    return (
      <table className="token-list dapp-zebra">
        <tbody>
          <td>
            <SecurityIcon />
            <strong>CoinName</strong>
          </td>
          <td>CoinAmount</td>
          <td>
            <a href="/send-token/0x65b42142606a9d46d05ea5205ad4b610a9130e92/0x2c92e68178c6fad7e72e1c3bd49bdc30c69652fb">
              <i class="icon-arrow-up" />
              Send
            </a>
          </td>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Addresses);
