import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// views
import AccountView from './Account';
import SingleAccountView from './SingleAccountView';
import SingleContractView from './SingleContractView';
import ContractsView from './Contracts';
import SendContractForm from './Send';
import NewWalletContract from './NewWalletContract';

class ViewContainer extends Component {
  render() {
    return (
      <div className="dapp-flex-content">
        <main className="dapp-content">
          <Route exact path="/accounts" component={AccountView} />
          <Route path="/account/*" component={SingleAccountView} />
          <Route exact path="/wallet/new" component={NewWalletContract} />
          <Route path="/contract/*" component={SingleContractView} />
          <Route path="/send*" component={SendContractForm} />
          <Route exact path="/contracts" component={ContractsView} />
        </main>
      </div>
    );
  }
}

export default ViewContainer;
