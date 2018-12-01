import React, { Component } from 'react';
import { connect } from 'react-redux';
import SecurityIcon from './SecurityIcon.js';
import shortid from 'shortid';
import * as Actions from '../../actions/actions.js';
import * as Utils from '../../utils/utils.js';
import LinearProgress from '@material-ui/core/LinearProgress';

import { Identicon } from 'ethereum-react-components';

class LatestTransactions extends Component {
  renderProgressBar(tx) {
    this.state = {
      completed:
        tx.confirmationNumber !== 'Pending' ? tx.confirmationNumber : 0,
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

  // snapshotted
  renderDateInfo(tx) {
    return (
      <td
        className="time simptip-position-right simptip-movable"
        data-tool-tip={tx.dateSent}
      >
        <h2>{Utils.getMonthName(tx.dateSent)}</h2>
        <p>{Utils.getDate(tx.dateSent)}</p>
      </td>
    );
  }

  // snapshotted
  renderTransactionType(tx) {
    return (
      <td className="account-name">
        <h2>Transaction Type</h2>
        <p>
          <span className="address dapp-shorten-text not-ens-name">
            {/*}
            <SecurityIcon
              type="transactionHref"
              classes="dapp-identicon dapp-tiny"
              hash={tx.from}
            />
          */}
            <Identicon size="tiny" address={tx.from} />
          </span>
          <span className="arrow">→</span>
          <span className="address dapp-shorten-text not-ens-name">
            {/*}
            <SecurityIcon
              type="transactionHref"
              classes="dapp-identicon dapp-tiny"
              hash={tx.to}
            />
          */}
            <Identicon size="tiny" address={tx.to} />
          </span>
        </p>
      </td>
    );
  }

  // snapshotted
  renderTransactionInfo(tx) {
    return (
      <td className="info">
        {tx.confirmationNumber === 'Pending'
          ? 'Pending...'
          : tx.confirmationNumber + ' of 12 Confirmations'}
      </td>
    );
  }

  // snapshotted
  renderTransactionAmount(tx) {
    return (
      <td className="transaction-amount minus">
        -
        {this.props.web3 && this.props.web3.web3Instance
          ? Utils.displayPriceFormatter(this.props, tx.value, 'ETHER') +
            ' ETHER'
          : tx.value}
      </td>
    );
  }

  renderIcon() {
    return (
      <td>
        <i className="icon-arrow-right minus" />
      </td>
    );
  }

  //TODO: snapshot
  renderTableRow(tx) {
    return (
      <tr
        className={tx.confirmationNumber === 'Pending' ? 'unconfirmed' : ''}
        // key={tx.transactionHash}
        key={shortid.generate()}
        data-transaction-hash={tx.transactionHash}
        data-block-hash={tx.blockHash}
        onClick={e => {
          if (e.target.tagName !== 'A') {
            this.props.updateSelectedTransaction(tx);
            this.props.displayModal('displayTransaction');
          }
        }}
      >
        {this.renderDateInfo(tx)}
        {this.renderTransactionType(tx)}
        {this.renderTransactionInfo(tx)}
        {this.renderTransactionAmount(tx)}
        {this.renderIcon()}
      </tr>
    );
  }

  //TODO: snapshot

  // <React.Fragment>
  //               {this.renderTableRow(transactions[txHash])}
  //               {}
  //               {this.renderProgressBar(transactions[txHash])}
  //             }
  //             </React.Fragment>
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
        <table className="dapp-zebra transactions">
          <tbody>
            {Object.keys(transactions).map(txHash =>
              this.renderTableRow(transactions[txHash])
            )}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  ...state,
});

export default connect(
  mapStateToProps,
  { ...Actions }
)(LatestTransactions);
