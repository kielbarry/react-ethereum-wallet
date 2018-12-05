import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

import TransactionItem from './TransactionItem';

export class LatestTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      searchValue: '',
      searchField: 'none',
      ascending: 'false',
      sortOption: 'dateSent',
      filteredTransactions: [],
    };

    this.fetchTransactions = this.fetchTransactions.bind(this);
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.filterSearchValue = this.filterSearchValue.bind(this);
    this.selectSearchField = this.selectSearchField.bind(this);
    this.selectSortOption = this.selectSortOption.bind(this);
    this.sortOptions = this.sortOptions.bind(this);
    this.toggleSortDirection = this.toggleSortDirection.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.transactions !== nextProps.transactions) {
      return true;
    }
    return false;
  }

  fetchTransactions() {
    let transactions = this.state.filteredTransactions;
    if (typeof transactions === 'undefined' && transactions.length === 0) {
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
    let field = this.state.sortOption;

    if (this.state.sortOption !== 'none' && this.state.sortOption !== '') {
      let sorted = transactions.sort((a, b) => {
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
        <tbody>
          {txArr.map(tx => (
            <TransactionItem key={shortid.generate()} transaction={tx} />
          ))}
        </tbody>
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
  null
)(LatestTransactions);
