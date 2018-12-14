import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import { Identicon } from 'ethereum-react-components';
import SU from '../components/elements/SelectableUnit';
import AccountActionBar from '../components/elements/AccountActionBar';
import LatestTransactions from '../components/elements/LatestTransactions';
import NoMatchingTransaction from '../components/elements/NoMatchingTransaction';
import TokenList from '../components/TokenList';

import EditableName from '../components/EditableName';

// views
import NotFound from './NotFound';

// utils and actions
import { displayPriceFormatter } from '../utils/utils';
import * as Actions from '../actions/actions';

export const StickyHeader = ({ sw }) => {
  return (
    <div className="dapp-sticky-bar dapp-container">
      <Identicon classes="dapp-identicon" title address={sw.address} />
    </div>
  );
};

export const AccountDetails = ({ sw }) => {
  return (
    <React.Fragment>
      <EditableName addressType="address" sw={sw} />
      <h2 className="copyable-address">
        <i className="icon-key" title="Account" />
        <span>{sw.address}</span>
      </h2>
      <div className="clear" />
    </React.Fragment>
  );
};

export const AccountDescription = () => {
  return (
    <div className="account-info">
      <h3>NOTE </h3>
      <p>
        Accounts can't display incoming transactions, but can receive, hold and
        send Ether. To see incoming transactions, create a wallet contract to
        store ether.
      </p>
      <p>
        <strong>
          If your balance doesn't seem updated, make sure that you are in sync
          with the network.
        </strong>
      </p>
    </div>
  );
};

export class SingleAccountView extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setState({ displaySU: false });
    // ('.dapp-sticky-bar').addClass('sticky');
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    // ('.dapp-sticky-bar').addClass('sticky');
  }

  toggleSU() {
    if (this.state.displaySU === undefined) this.setState({ displaySU: false });
    else {
      this.state.displaySU
        ? this.setState({ displaySU: false })
        : this.setState({ displaySU: true });
    }
  }

  renderAccountTransactions() {
    const address = this.props.reducers.selectedWallet.address;
    const transactions = this.props.reducers.Transactions;
    const accountTxns = {};
    Object.keys(transactions).map(hash => {
      if (
        transactions[hash].from === address.toLowerCase() ||
        transactions[hash].to === address.toLowerCase()
      ) {
        accountTxns[hash] = transactions[hash];
      }
      return null;
    });
    return (
      <div className="accounts-transactions">
        {Object.keys(accountTxns).length &&
        accountTxns.constructor === Object ? (
          <LatestTransactions transactions={accountTxns} />
        ) : (
          <NoMatchingTransaction />
        )}
      </div>
    );
  }

  renderBalance() {
    const sw = this.props.reducers.selectedWallet;
    return (
      <span className="account-balance">
        {displayPriceFormatter(this.props, sw.wallet.balance)}
        <span className="inline-form" name="unit">
          <button
            type="button"
            data-name="unit"
            data-value={this.props.reducers.currency}
            onClick={() => this.toggleSU()}
          >
            &nbsp;{this.props.reducers.currency}
          </button>
          <SU displaySU={this.state.displaySU} />
        </span>
      </span>
    );
  }

  renderSingleAccount() {
    const sw = this.props.reducers.selectedWallet;
    return (
      <div className="dapp-container accounts-page">
        <StickyHeader sw={sw} />
        {/*
        <EditableName addressType="address" />
        <EditableName addressType="address" />
        */}
        <div className="accounts-page-summary">
          <Identicon classes="dapp-identicon" title address={sw.address} />
          <header>
            <AccountDetails sw={sw} />
            {this.renderBalance()}
            {sw.wallet.tokens ? <TokenList /> : null}
            <AccountDescription />
          </header>
        </div>
        <AccountActionBar wallet={sw} />
        {this.renderAccountTransactions()}
      </div>
    );
  }

  render() {
    const w = this.props.reducers.selectedWallet;
    return w === undefined || w === '' ? (
      <NotFound />
    ) : (
      this.renderSingleAccount()
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(SingleAccountView);
