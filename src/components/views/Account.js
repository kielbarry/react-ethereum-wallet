import React, { Component } from 'react';
import { connect } from 'react-redux';

import AccountItem from '../elements/AccountItem.js';
import ContractItem from '../elements/ContractItem.js';
import LatestTransactions from '../elements/LatestTransactions.js';
import { Link } from 'react-router-dom';

import web3test from '../../web3/Web3Initializer.js';

class AccountView extends Component {
  constructor(props) {
    super(props);
  }

  // snapshotted
  renderTitle() {
    return (
      <h1>
        <strong>Accounts</strong> Overview
      </h1>
    );
  }

  renderAccounts() {
    if (this.props.reducers.Wallets !== undefined) {
      const wallets = this.props.reducers.Wallets;
      const icon = 'icon-key';
      return (
        <React.Fragment>
          {Object.keys(wallets).map((address, i) => (
            <AccountItem
              key={address}
              number={i + 1}
              icon={icon}
              address={address}
              wallet={wallets[address]}
              props={this.props}
            />
          ))}
        </React.Fragment>
      );
    }
  }

  // snapshotted
  renderWalletDescription() {
    return (
      <React.Fragment>
        <h2>Wallet Contracts</h2>
        <p>
          These contracts are stored on the blockchain and can hold and secure
          Ether. They can have multiple accounts as owners and keep a full log
          of all transactions.
        </p>
        <div className="dapp-clear-fix" />
      </React.Fragment>
    );
  }

  renderWalletBoxList() {
    const walletContractList = this.props.reducers.WalletContracts;
    const icon = 'icon-eye';
    let {
      ContractsPendingConfirmations,
      WalletContracts,
    } = this.props.reducers;
    let contracts = Object.assign(
      {},
      ContractsPendingConfirmations,
      WalletContracts
    );
    return (
      <React.Fragment>
        <div className="wallet-box-list">
          {Object.keys(contracts).map((address, i) => (
            <ContractItem
              key={address}
              number={i + 1}
              icon={icon}
              pending={
                Object.keys(contracts[address]).length === 0 &&
                contracts[address].constructor === Object
                  ? true
                  : false
              }
              contract={contracts[address]}
              address={address}
              wallet={contracts[address].length === 0 ? contracts[address] : ''}
              props={this.props}
            />
          ))}
        </div>
        <div className="dapp-clear-fix" />
      </React.Fragment>
    );
  }

  // snapshooted
  renderWalletLink() {
    return (
      <React.Fragment>
        <Link
          to={{ pathname: '/wallet/new' }}
          className="wallet-box create add-contract"
        >
          <div className="account-pattern">+</div>
          <h3>ADD WALLET CONTRACT</h3>
        </Link>
        <div className="dapp-clear-fix" />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="dapp-container account-page">
        {this.renderTitle()}
        {this.renderAccounts()}
        {this.renderWalletDescription()}
        {this.renderWalletBoxList()}
        {this.renderWalletLink()}
        {this.props.reducers.Transactions ? (
          <LatestTransactions transactions={this.props.reducers.Transactions} />
        ) : (
          <div>No transactions found.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(AccountView);
