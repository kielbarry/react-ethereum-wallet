import React, { Component } from 'react';
import { connect } from 'react-redux';

// import PageHeader from '../elements/PageHeaders.jsx';
// import { AccountPageHeader } from '../../constants/FieldConstants.jsx';
import AccountItem from '../elements/AccountItem.js';
import ContractItem from '../elements/ContractItem.js';
import LatestTransactions from '../elements/LatestTransactions.js';
import { Link } from 'react-router-dom';

class AccountView extends Component {
  constructor(props) {
    super(props);
    this.makeID = this.makeID.bind(this);
    this.makeIDInterval = setInterval(() => this.makeID(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.makeIDInterval);
  }

  // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  makeID() {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
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

  renderWalletBoxList() {
    // if (this.props.reducers.WalletContracts !== undefined) {
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
      </React.Fragment>
    );
    // }
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
        <h2>Wallet Contracts</h2>
        <p>
          These contracts are stored on the blockchain and can hold and secure
          Ether. They can have multiple accounts as owners and keep a full log
          of all transactions.
        </p>
        <div className="dapp-clear-fix" />
        <div className="wallet-box-list">{this.renderWalletBoxList()}</div>
        <div className="dapp-clear-fix" />
        <Link
          to={{ pathname: '/wallet/new' }}
          className="wallet-box create add-contract"
        >
          <div className="account-pattern">+</div>
          <h3>ADD WALLET CONTRACT</h3>
        </Link>
        <div className="dapp-clear-fix" />
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
