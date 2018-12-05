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
    this.state = {
      ...this.props,
      searchValue: '',
      searchField: 'none',
      ascending: 'false',
      sortOption: 'dateSent',
      filtertedTransactions: [],
    };

    this.fetchTransactions = this.fetchTransactions.bind(this);
    this.updateToTransaction = this.updateToTransaction.bind(this);
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.filterSearchValue = this.filterSearchValue.bind(this);
    this.selectSearchField = this.selectSearchField.bind(this);
    this.selectSortOption = this.selectSortOption.bind(this);
    this.sortOptions = this.sortOptions.bind(this);
    this.toggleSortDirection = this.toggleSortDirection.bind(this);
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
      <React.Fragment>
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
          <td>
            <h2 />
            <i className="icon-ban" />
            <i className="icon-reload" />
          </td>
          <TransactionInfo tx={tx} />
          {this.renderTransactionAmount(tx)}
          <MinusIcon />
        </tr>
      </React.Fragment>
    );
  }

  fetchTransactions() {
    let transactions = this.state.filteredTransactions;
    if (typeof transactions !== 'undefined' && transactions.length > 0) {
      transactions = Object.keys(this.props.transactions).map(
        key => this.props.transactions[key]
      );
    }
    return transactions;
  }

  selectSortOption(e) {
    this.setState({ sortOption: e.target.value });
  }

  sortOptions(e) {
    let transactions = this.fetchTransactions();

    if (this.state.sortOption !== 'none' && this.state.sortOption !== '') {
      let sorted = txs.sort((a, b) => {
        return b[field] - a[field];
      });
      this.setState({ filteredTransactions: sorted });
    } else {
      this.setState({ filteredTransactions: transactions });
    }
  }

  updateSearchValue(e) {
    this.setState({ searchValue: e.target.value });
  }

  filterSearchValue(e) {
    let transactions = this.fetchTransactions();

    if (this.state.searchValue !== '' && this.state.searchField !== 'none') {
      let filteredArr = transactions.filter(tx => {
        let txValue = tx[this.state.searchField].toLowerCase();
        let searchValue = this.state.searchValue.toLowerCase();
        return txValue.includes(searchValue);
      });
      console.log(filteredArr);
      this.setState({ filteredTransactions: filteredArr });
    } else {
      this.setState({ filteredTransactions: transactions });
    }
  }

  selectSearchField(e) {
    this.setState({ searchField: e.target.value });
  }

  toggleSortDirection(e) {
    this.setState({ ascending: !this.state.ascending });
  }

  renderSearchField() {
    let optionsArr = [
      {
        displayName: 'To',
        txKey: 'to',
      },
      {
        displayName: 'From',
        txKey: 'from',
      },
      {
        displayName: 'TransactionType (experimental)',
        txKey: 'transactionType',
      },
      // {
      //   displayName: 'Block Number',
      //   txKey: 'blockNumber',
      // },
    ];
    return (
      <React.Fragment>
        <h2>Latest transactions</h2>
        <br />
        <input
          type="text"
          className="filter-transactions"
          placeholder="Filter transactions"
          onKeyUp={e => this.updateSearchValue(e)}
        />
        <select
          style={{ marginLeft: '20px' }}
          onChange={e => this.selectSearchField(e)}
          value={this.state.searchField}
        >
          <option key={shortid.generate()} value={'none'} />
          {optionsArr.map((val, i) => (
            <option key={shortid.generate()} value={val['txKey']}>
              {val['displayName']}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  }

  renderSortOptions() {
    let optionsArr = [
      {
        displayName: 'Confirmations',
        txKey: 'confirmationNumber',
      },
      {
        displayName: 'Date',
        txKey: 'dateSent',
      },
      {
        displayName: 'Nonce (experimental)',
        txKey: 'none',
      },
      {
        displayName: 'Amount',
        txKey: 'value',
      },
      {
        displayName: 'Gas Used',
        txKey: 'gasUsed',
      },
      {
        displayName: 'Block Number',
        txKey: 'blockNumber',
      },
    ];
    return (
      <React.Fragment>
        <select
          style={{ marginLeft: '20px' }}
          onChange={e => this.selectSortOption(e)}
          value={this.state.sortOption}
        >
          <option key={shortid.generate()} value={'none'} />
          {optionsArr.map((val, i) => (
            <option key={shortid.generate()} value={val['txKey']}>
              {val['displayName']}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  }

  renderDirectionalIcon() {
    let icon = this.state.ascending ? 'up' : 'down';
    return (
      <i
        className={'icon-arrow-' + icon}
        onClick={e => this.toggleSortDirection(e)}
      />
    );
  }

  renderTransactions() {
    let transactions = this.state.transactions;
    let txArr = Object.keys(transactions).map(hash => {
      return transactions[hash];
    });
    return (
      <table className="dapp-zebra transactions">
        <tbody>{txArr.map(tx => this.renderTableRow(tx))}</tbody>
      </table>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderSearchField()}
        {this.renderSortOptions()}
        {this.renderDirectionalIcon()}
        {this.renderTransactions()}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  ...state,
});

export default connect(
  mapStateToProps,
  {
    updateSelectedTransaction,
    displayModal,
  }
)(LatestTransactions);
