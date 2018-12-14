import React, { Component } from 'react';
import { connect } from 'react-redux';

import LatestTransactions from '../components/elements/LatestTransactions';
import NoMatchingTransaction from '../components/elements/NoMatchingTransaction';

import Addresses from '../components/Addresses';
import DeployedWallets from '../components/DeployedWallets';

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
    const txs = this.props.Transactions;
    return (
      <div className="dapp-container account-page">
        <StatelessPageContent />
        {Object.keys(txs).length && txs.constructor === Object ? (
          <LatestTransactions transactions={txs} />
        ) : (
          <NoMatchingTransaction />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Transactions: state.reducers.Transactions,
});

export default connect(mapStateToProps)(AccountView);
