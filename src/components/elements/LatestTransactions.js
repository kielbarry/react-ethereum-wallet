import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
// import * as Actions from '../../actions/actions.js';
// import * as Utils from '../../utils/utils.js';

import {
  updateSelectedTransaction,
  displayModal,
} from '../../actions/actions.js';

import {
  getMonthName,
  getDate,
  displayPriceFormatter,
} from '../../utils/utils.js';
import LinearProgress from '@material-ui/core/LinearProgress';

import { Identicon } from 'ethereum-react-components';

// snapshotted
const TransactionInfo = props => {
  return (
    <td className="info">
      {props.tx.confirmationNumber === 'Pending'
        ? 'Pending...'
        : props.tx.confirmationNumber + ' of 12 Confirmations'}
    </td>
  );
};

const MinusIcon = () => {
  return (
    <td>
      <i className="icon-arrow-right minus" />
    </td>
  );
};

const DateInfo = props => {
  return (
    <td
      className="time simptip-position-right simptip-movable"
      data-tool-tip={props.tx.dateSent}
    >
      <h2>{getMonthName(props.tx.dateSent)}</h2>
      <p>{getDate(props.tx.dateSent)}</p>
    </td>
  );
};

export class LatestTransactions extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   transactions: {
    //     // ...this.props.Transactions
    //     ...this.props.transactions
    //   }
    // }
    this.state = this.props;

    console.log('constructor in state', this.state);
    console.log('constructor in props', this.props);

    this.updateToTransaction = this.updateToTransaction.bind(this);
    this.selectSortOption = this.selectSortOption.bind(this);
  }
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

  updateToTransaction(e) {
    e.stopPropagation();
    console.warn('todo: moved from security icon and need to pudate');
    // this.props.updateTransactionToSend({
    //   name: 'to',
    //   value: props.hash,
    // });
  }

  // snapshotted
  renderTransactionType(tx) {
    //TODO: transaction type
    return (
      <td className="account-name">
        <h2>Transaction Type</h2>
        <p>
          <span className="address dapp-shorten-text not-ens-name">
            <Identicon
              classes="dapp-identicon dapp-tiny"
              title
              size="tiny"
              seed={tx.from}
            />
            <Link
              to={{ pathname: '/send-from/' + tx.from }}
              title={tx.from}
              onClick={e => this.updateToTransaction(e)}
            >
              {tx.from}
            </Link>
          </span>
          <span className="arrow">→</span>
          <span className="address dapp-shorten-text not-ens-name">
            <Identicon
              classes="dapp-identicon dapp-tiny"
              title
              size="tiny"
              seed={tx.to}
            />
            <Link
              to={{ pathname: '/send-from/' + tx.to }}
              title={tx.to}
              onClick={e => this.updateToTransaction(e)}
            >
              {tx.to}
            </Link>
          </span>
        </p>
      </td>
    );
  }

  // snapshotted
  renderTransactionAmount(tx) {
    return (
      <td className="transaction-amount minus">
        -
        {this.props.web3 && this.props.web3.web3Instance
          ? displayPriceFormatter(this.props, tx.value, 'ETHER') + ' ETHER'
          : tx.value}
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
        <DateInfo tx={tx} />
        {this.renderTransactionType(tx)}
        <TransactionInfo tx={tx} />
        {this.renderTransactionAmount(tx)}
        <MinusIcon />
      </tr>
    );
  }

  selectSortOption(e) {
    console.log(e.target.value);
  }

  render() {
    console.log('this.state in render', this.state);
    console.log('this.props in render', this.props);
    // let transactions = this.props.reducers.Transactions;
    let transactions = this.state.transactions;
    return (
      <React.Fragment>
        <h2>Latest transactions</h2>
        <br />
        <input
          type="text"
          className="filter-transactions"
          placeholder="Filter transactions"
        />

        <select
          style={{ marginLeft: '20px' }}
          onChange={e => this.selectSortOption(e)}
        >
          <option key={shortid.generate()} value={'none'} />
          <option key={shortid.generate()} value={'Status'}>
            Status
          </option>
          <option key={shortid.generate()} value={'Date'}>
            Date
          </option>
          <option key={shortid.generate()} value={'TransactionType'}>
            TransactionType
          </option>
          <option key={shortid.generate()} value={'Amount'}>
            Amount
          </option>
        </select>
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
  //   Transactions: state.reducers.Transactions,
  // transactions: state.transactions
});

export default connect(
  mapStateToProps,
  // null,
  {
    updateSelectedTransaction,
    displayModal,
  }
)(LatestTransactions);
