import React, { Component } from 'react';
import { connect } from 'react-redux';

import AccountItem from '../elements/AccountItem.js';
import ContractItem from '../elements/ContractItem.js';
import LatestTransactions from '../elements/LatestTransactions.js';
import { Link } from 'react-router-dom';

import web3test from '../../web3/Web3Initializer.js';

import Addresses from '../Addresses.js';
import DeployedWallets from '../DeployedWallets.js';

// snapshotted
const Title = () => {
  return (
    <h1>
      <strong>Accounts</strong> Overview
    </h1>
  );
};

class AccountView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dapp-container account-page">
        <Title />
        <Addresses />
        <DeployedWallets />
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
