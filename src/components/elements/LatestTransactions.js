import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

import TransactionItem from './TransactionItem';

export class LatestTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      filterOptions: {
        searchValue: '',
        searchField: 'none',
        ascending: 'false',
        sortOption: 'dateSent',
      },
      filteredTransactions: [],
    };

    this.fetchTransactions = this.fetchTransactions.bind(this);
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.filterSearchValue = this.filterSearchValue.bind(this);
    this.selectSearchField = this.selectSearchField.bind(this);
    this.selectSortOption = this.selectSortOption.bind(this);
    this.sortOptions = this.sortOptions.bind(this);
    this.toggleSortDirection = this.toggleSortDirection.bind(this);
    this.sortTransactions = this.sortTransactions.bind(this);
  }

  // TODO: was this done right? nextProps vs prevProps?
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.transactions !== nextProps.transactions) {
      this.filterSearchValue();
      this.sortOptions();
      this.sortTransactions();
      return true;
    }
    if (this.state.filterOptions !== nextState.filterOptions) {
      this.filterSearchValue();
      this.sortOptions();
      this.sortTransactions();
      return true;
    }
    return false;
  }

  fetchTransactions() {
    let transactions = this.state.filteredTransactions;
    if (transactions.length === 0) {
      transactions = Object.keys(this.props.transactions).map(
        key => this.props.transactions[key]
      );
    }
    return transactions;
  }

  selectSortOption(e) {
    this.setState({
      filterOptions: {
        ...this.state.filterOptions,
        sortOption: e.target.value,
      },
    });
    this.sortOptions();
  }

  sortOptions(e) {
    let transactions = this.fetchTransactions();
    let field = this.state.filterOptions.sortOption;

    if (
      this.state.filterOptions.sortOption !== 'none' &&
      this.state.filterOptions.sortOption !== ''
    ) {
      let sorted = transactions.sort((a, b) => {
        return b[field] - a[field];
      });
      this.setState({ filteredTransactions: sorted });
    } else {
      this.setState({ filteredTransactions: transactions });
    }
  }

  updateSearchValue(e) {
    this.setState({
      filterOptions: {
        ...this.state.filterOptions,
        searchValue: e.target.value,
      },
    });
    this.filterSearchValue();
  }

  filterSearchValue(e) {
    let transactions = this.fetchTransactions();
    console.log(transactions);
    if (
      this.state.filterOptions.searchValue !== '' &&
      this.state.filterOptions.searchField !== 'none'
    ) {
      let filteredArr = transactions.filter(tx => {
        let txValue = tx[this.state.filterOptions.searchField].toLowerCase();
        let searchValue = this.state.filterOptions.searchValue.toLowerCase();
        return txValue.includes(searchValue);
      });
      console.log(filteredArr);
      this.setState({ filteredTransactions: filteredArr });
    } else {
      this.setState({ filteredTransactions: transactions });
    }
  }

  selectSearchField(e) {
    this.setState({
      filterOptions: {
        ...this.state.filterOptions,
        searchField: e.target.value,
      },
    });
    this.filterSearchValue();
  }

  toggleSortDirection(e) {
    this.setState({
      filterOptions: {
        ...this.state.filterOptions,
        ascending: !this.state.filterOptions.ascending,
      },
    });
    this.sortTransactions();
  }

  sortTransactions() {
    this.setState({
      filteredTransactions: this.state.filteredTransactions.reverse(),
    });
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
          value={this.state.filterOptions.searchField}
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
          value={this.state.filterOptions.sortOption}
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
    let icon = this.state.filterOptions.ascending ? 'up' : 'down';
    return (
      <i
        className={'icon-arrow-' + icon}
        style={{ marginLeft: '20px' }}
        onClick={e => this.toggleSortDirection(e)}
      />
    );
  }

  renderTransactions() {
    // let transactions = this.state.transactions;
    let transactions;
    if (this.state.filteredTransactions.length !== 0) {
      transactions = this.state.filteredTransactions;
    } else {
      transactions = Object.keys(this.props.transactions).map(hash => {
        return this.props.transactions[hash];
      });
    }

    // let transactions = this.state.filteredTransactions;
    // let txArr = Object.keys(transactions).map(hash => {
    //   return transactions[hash];
    // });
    return (
      <table className="dapp-zebra transactions">
        <tbody>
          {transactions.map(tx => (
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
