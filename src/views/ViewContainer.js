import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// views
import AccountView from './Account.js';

import SingleAccountView from './SingleAccountView.js';
import SingleContractView from './SingleContractView.js';
import ContractsView from './Contracts.js';
import SendContractForm from './Send.js';
import NewWalletContract from './NewWalletContract.js';

class ViewContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dapp-flex-content">
        <main className="dapp-content">
          <Route exact path="/accounts" component={AccountView} />
          <Route path="/account/*" component={SingleAccountView} />
          <Route exact path="/wallet/new" component={NewWalletContract} />
          <Route path="/contract/*" component={SingleContractView} />
          <Route path="/send-from*" component={SendContractForm} />
          <Route exact path="/contracts" component={ContractsView} />
        </main>
      </div>
    );
  }
}

export default ViewContainer;
