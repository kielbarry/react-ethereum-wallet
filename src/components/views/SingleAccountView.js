import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import SU from '../elements/SelectableUnit.js';
import AccountActionBar from '../elements/AccountActionBar.js';
import ContractActionBar from '../elements/ContractActionBar.js';
import NotFound from './NotFound.js';

import SecurityIcon from '../elements/SecurityIcon.js';
import * as Utils from '../../utils/utils.js';
import * as Helpers from '../../utils/helperFunctions.js';
import LatestTransactions from '../elements/LatestTransactions.js';
import shortid from 'shortid';

import * as Actions from '../../actions/actions.js';

export class SingleAccountView extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentDidMount() {
    // this.setState({
    //   small: false,
    //   sticky: false,
    //   time: 'Waiting for blocks...',
    // });
    // this.setState({ displaySU: false });
    window.addEventListener('scroll', this.handleScroll);
    // ('.dapp-sticky-bar').addClass('sticky');
  }

  componentDidMount() {
    this.setState({ displaySU: false });
  }

  componentWillUnmount() {
    console.log('unmounting');
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
    let sw = this.props.reducers.selectedWallet;
    let address = sw.address;
    let transactions = this.props.reducers.Transactions;
    let accountTxns = {};
    Object.keys(transactions).map(hash => {
      if (hash === address) {
        accountTxns[address] = transactions[hash];
      }
      return null;
    });
    return (
      <div className="accounts-transactions">
        {accountTxns !== {} ? (
          <LatestTransactions transactions={accountTxns} />
        ) : (
          <div>No transactions found...</div>
        )}
      </div>
    );
  }

  renderSingleAccount() {
    let sw = this.props.reducers.selectedWallet;
    return (
      <div className="dapp-container accounts-page">
        <div className="dapp-sticky-bar dapp-container">
          <SecurityIcon
            type="singleAccountView"
            classes="dapp-identicon"
            hash={sw.address}
          />
        </div>
        <div className="accounts-page-summary">
          <SecurityIcon
            type="singleAccountView"
            classes="dapp-identicon"
            hash={sw.address}
          />
          <header>
            <h1>
              <span>Account {sw.number}</span>
              <em className="edit-name">Account {sw.number}</em>
              <i className="edit-icon icon-pencil" />
            </h1>
            <h2 className="copyable-address">
              <i className="icon-key" title="Account" />
              <span>{sw.address}</span>
            </h2>
            <div className="clear" />
            <span className="account-balance">
              {this.props.web3 && this.props.web3.web3Instance
                ? Utils.displayPriceFormatter(this.props, sw.wallet)
                : sw.wallet}
              <span className="inline-form" name="unit">
                <button
                  type="button"
                  data-name="unit"
                  data-value={this.props.reducers.currency}
                  onClick={() => this.toggleSU()}
                >
                  {this.props.reducers.currency}
                </button>
                <SU displaySU={this.state.displaySU} />
              </span>
            </span>
            {/* Account infos */}
            <div className="account-info">
              <h3>NOTE </h3>
              <p>
                Accounts can't display incoming transactions, but can receive,
                hold and send Ether. To see incoming transactions create a
                wallet contract to store ether.
              </p>
              <p>
                If your balance doesn't seem updated, make sure that you are in
                sync with the network.
              </p>
            </div>
          </header>
        </div>
        <AccountActionBar props={sw} />
        {this.renderAccountTransactions()}
      </div>
    );
  }

  render() {
    let w = this.props.reducers.selectedWallet;
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
