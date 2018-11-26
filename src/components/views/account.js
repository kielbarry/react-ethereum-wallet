import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddForm from '../AddForm.jsx';

import AccountItem from '../elements/AccountItem.jsx';
import LatestTransactions from '../elements/LatestTransactions.jsx';

const listItems = [
  {
    title: 'Accounts',
    redirect: true,
    link: '',
    buttonClass: 'wallet-box create',
    buttonDescription: 'ADD ACCOUNT',
    contractDescription:
      "Accounts are password protected keys that can hold Ether and Ethereum-based tokens. They can control contracts, but can't display incoming transactions.",
  },
  {
    title: 'Wallet Contracts',
    redirect: false,
    link: 'account/new',
    buttonClass: 'wallet-box create add-contract',
    buttonDescription: 'ADD WALLET CONTRACT',
    contractDescription:
      'These contracts are stored on the blockchain and can hold and secure Ether. They can have multiple accounts as owners and keep a full log of all transactions.',
  },
];

class AccountView extends Component {
  renderAccounts() {
    if (this.props.reducers.Wallets !== undefined) {
      const wallets = this.props.reducers.Wallets;
      return (
        <React.Fragment>
          {Object.keys(wallets).map((address, i) => (
            <AccountItem
              key={address}
              number={i + 1}
              address={address}
              wallet={wallets[address]}
              props={this.props}
            />
          ))}
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div className="dapp-container account-page">
        <h1>
          <strong>Accounts</strong> Overview
        </h1>
        {this.renderAccounts()}
        {listItems.map((field, i) => (
          <AddForm key={`account-view-${i}`} field={field} />
        ))}

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
