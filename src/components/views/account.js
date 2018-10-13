import React, { Component } from 'react';
import { connect } from 'react-redux';

// import AddForm from '../AddForm.js';
// import PageHeader from '../elements/PageHeaders.jsx';
// import { AccountPageHeader } from '../../constants/FieldConstants.jsx';
import AccountItem from '../elements/AccountItem.js';
import LatestTransactions from '../elements/LatestTransactions.js';

// const listItems = [
//   {
//     title: 'Accounts',
//     redirect: true,
//     link: '',
//     buttonClass: 'wallet-box create',
//     buttonDescription: 'ADD ACCOUNT',
//     contractDescription:
//       "Accounts are password protected keys that can hold Ether and Ethereum-based tokens. They can control contracts, but can't display incoming transactions.",
//   },
//   {
//     title: 'Wallet Contracts',
//     redirect: false,
//     link: 'account/new',
//     buttonClass: 'wallet-box create add-contract',
//     buttonDescription: 'ADD WALLET CONTRACT',
//     contractDescription:
//       'These contracts are stored on the blockchain and can hold and secure Ether. They can have multiple accounts as owners and keep a full log of all transactions.',
//   },
// ];

class AccountView extends Component {
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

  renderWalletBoxList() {
    if (this.props.reducers.WalletContracts !== undefined) {
      const walletContractList = this.props.reducers.WalletContracts;
      const icon = 'icon-wallet';
      return (
        <React.Fragment>
          {Object.keys(walletContractList).map((address, i) => (
            <AccountItem
              key={address}
              number={i + 1}
              icon={icon}
              address={address}
              wallet={walletContractList[address]}
              props={this.props}
            />
          ))}
        </React.Fragment>
      );
    }
  }

  routeToDeployContract(e) {
    console.log('here in routeToDeployContract', e);
  }

  render() {
    return (
      <div className="dapp-container account-page">
        <h1>
          <strong>Accounts</strong> Overview
        </h1>
        {this.renderAccounts()}
        <a href="" className="wallet-box create">
          <div className="account-pattern">+</div>
          <h3>ADD ACCOUNT</h3>
        </a>
        <h2>Wallet Contracts</h2>
        <p>
          These contracts are stored on the blockchain and can hold and secure
          Ether. They can have multiple accounts as owners and keep a full log
          of all transactions.
        </p>
        <div className="dapp-clear-fix" />
        <div className="wallet-box-list">{this.renderWalletBoxList()}</div>
        <button
          className="wallet-box create add-contract"
          onClick={e => this.routeToDeployContract(e)}
        >
          <div className="account-pattern">+</div>
          <h3>ADD WALLET CONTRACT</h3>
        </button>
        <div className="dapp-clear-fix" />
        {this.props.reducers.Transactions ? (
          <LatestTransactions transactions={this.props.reducers.Transactions} />
        ) : (
          <div>No transactions found...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(AccountView);
