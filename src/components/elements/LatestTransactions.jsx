import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Utils from '../../utils/utils.js';

import SecurityIcon from './SecurityIcon.jsx';

class LatestTransactions extends Component {
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <h2>Latest transactions</h2>
        <br />
        <input
          type="text"
          className="filter-transactions"
          placeholder="Filter transactions"
        />
        <table>
          <tr data-transacation-hash="" data-block-hash="">
            <td
              className="time simptip-position-right simptip-tip-movable"
              data-tool-tip=""
            >
              <h2>month</h2>
              <p>day</p>
            </td>
            <td>
              <h2>Transaction Type</h2>
              <p>
                <span className="address dapp-shorten-text not-ens-name">
                  <SecurityIcon wallet="asdvfasdvas" />
                </span>
                <span className="arrow">→</span>
                <span className="address dapp-shorten-text not-ens-name">
                  <SecurityIcon wallet="asdvfasdvas" />
                </span>
              </p>
            </td>
            <td className="info">time ago</td>
            <td className="transaction-amount minus">amount sent</td>
            <td>
              <i className="icon-arrow-right minus" />
            </td>
          </tr>
        </table>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  // ...state,
  Transactions: state.reducers.Transactions,
});
export default connect(mapStateToProps)(LatestTransactions);
