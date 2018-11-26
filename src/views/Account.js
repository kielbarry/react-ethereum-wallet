import React, { Component } from 'react';
import { connect } from 'react-redux';

import LatestTransactions from '../components/elements/LatestTransactions.js';

import Addresses from '../components/Addresses.js';
import DeployedWallets from '../components/DeployedWallets.js';

// snapshotted
const Title = () => {
  return (
    <h1>
      <strong>Accounts</strong> Overview
    </h1>
  );
};

const StatelessPageContent = () => {
  return (
    <React.Fragment>
      <Title />
      <Addresses />
      <DeployedWallets />
    </React.Fragment>
  );
};

export class AccountView extends Component {
  render() {
    return (
      <div className="dapp-container account-page">
        <StatelessPageContent />
        {this.props.Transactions ? (
          <LatestTransactions transactions={this.props.Transactions} />
        ) : (
          <div>No transactions found.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // return state;
  Transactions: state.reducers.Transactions,
});

export default connect(mapStateToProps)(AccountView);
