import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as Utils from '../../utils/utils.js';

// import './assets/react-toolbox/theme.css';
// import theme from './assets/react-toolbox/theme.js';
// import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
// import Button from 'react-toolbox/lib/button/Button';
// import ProgressBar from 'react-toolbox/lib/progress_bar';
// import Table from 'react-toolbox/lib/table';

import SecurityIcon from './SecurityIcon.jsx';

import * as Utils from '../../utils/utils.js';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';

class LatestTransactions extends Component {
  renderProgresBar(tx) {
    this.state = {
      completed: tx.confirmationNumber != 'Pending' ? tx.confirmationNumber : 0,
    };
    return (
      <React.Fragment>
        {tx.confirmationNumber === 'Pending' ? (
          <LinearProgress />
        ) : (
          <LinearProgress
            variant="determinate"
            value={(100 / 12) * this.state.completed}
          />
        )}
      </React.Fragment>
    );
  }

  renderTransaction(tx) {
    return (
      <React.Fragment>
        <tr
          className=""
          key={tx.transactionHash}
          data-transaction-hash={tx.transactionHash}
          data-block-hash={tx.blockHash}
        >
          <td
            className="time simptip-position-right simptip-tip-movable"
            data-tool-tip={tx.dateSent}
          >
            <h2>{Utils.getMonthName(tx.dateSent)}</h2>
            <p>{Utils.getDate(tx.dateSent)}</p>
          </td>
          <td className="account-name">
            <h2>Transaction Type</h2>
            <p>
              <span className="address dapp-shorten-text not-ens-name">
                <SecurityIcon
                  type="transactionHref"
                  classes="dapp-identicon dapp-tiny"
                  hash={tx.from}
                />
              </span>
              <span className="arrow">→</span>
              <span className="address dapp-shorten-text not-ens-name">
                <SecurityIcon
                  type="transactionHref"
                  classes="dapp-identicon dapp-tiny"
                  hash={tx.to}
                />
              </span>
            </p>
          </td>
          <td className="info">{tx.confirmationNumber} of 12 Confirmations</td>
          <td className="transaction-amount minus">
            -
            {this.props.web3 && this.props.web3.web3Instance
              ? Utils.displayPriceFormatter(this.props, tx.value)
              : tx.value}
          </td>
          <td>
            <i className="icon-arrow-right minus" />
          </td>
        </tr>
        {this.renderProgresBar(tx)}
      </React.Fragment>
    );
  }

  render() {
    let transactions = this.props.reducers.Transactions;
    return (
      <React.Fragment>
        <h2>Latest transactions</h2>
        <br />
        <input
          type="text"
          className="filter-transactions"
          placeholder="Filter transactions"
        />
        <table class="dapp-zebra transactions">
          <tbody>
            {Object.keys(transactions).map(txHash =>
              this.renderTransaction(transactions[txHash])
            )}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  ...state,
  // Transactions: state.reducers.Transactions,
});
export default connect(mapStateToProps)(LatestTransactions);
