
// modules
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from  'react-redux';

import store from './store/store.js';

// views
import AccountView from './components/views/account.js';
import ContractsView from './components/views/contracts.js';
import SendContractForm from './components/views/send.js';
import NavBar from './components/navbar';

// components
import MistAlert from './components/mistAlert.js';
import MistAlertBubble from './components/mistAlertBubble.js';

// stylesheets
import './stylesheets/mergedstyles.css';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    // var cn = require('classnames');

    this.state = {
      displayAlertMessage: false,
      alertKey: 'alert_20171104-hidden',
      peerCountIntervalId: null
    };
  }

  toggleAlertMessage(e) {
    this.state['displayAlertMessage']
      ? this.setState({ displayAlertMessage: false })
      : this.setState({ displayAlertMessage: true });
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <div className="App">
            <NavBar />
            <div className="dapp-flex-content">
              <main className="dapp-content">
                <BrowserRouter>
                  <div>
                    <Route exact path="/" component={AccountView} />
                    <Route exact path="/send-from" component={SendContractForm} />
                    <Route exact path="/contracts" component={ContractsView} />
                  </div>
                </BrowserRouter>

                <MistAlert
                  validStyles={this.state.displayAlertMessage}
                  onClick={() => this.toggleAlertMessage()}
                />
                <MistAlertBubble
                  validStyles={this.state.displayAlertMessage}
                  onClick={() => this.toggleAlertMessage()}
                />
              </main>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
