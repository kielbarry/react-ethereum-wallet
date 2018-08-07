
// modules
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import { Provider, connect } from  'react-redux';
import Web3 from 'web3';

// import store from './store/store.js';

// // actions
// import Actions  from './actions/actions.js';

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


    // wallet.app.texts.testnetExplain

    // Set provider
    /*global web3*/
    /*eslint no-undef: "error"*/
  // if (typeof web3 === undefined) {
  //   web3 = new Web3('ws://localhost:8546');
  //  // web3 = new Web3(web3.currentProvider);
  // } else {
  //   // web3 = new Web3('ws://localhost:8546');
  //   web3 = new Web3(web3.currentProvider);
  // }

  // web3.eth.isSyncing().then(resp => console.log(resp))


  // web3.eth.net.getNetworkType()
  // .then(console.log);
  // let blockheader = web3.eth.subscribe('newBlockHeaders')
  // console.log(blockheader)


    this.state = {
      displayAlertMessage: false,
      alertKey: 'alert_20171104-hidden',
      peerCountIntervalId: null
    };
  }

  componentDidMount(){
    // this.props.dispatch(updateConnectedNetwork())
  }


  toggleAlertMessage(e) {
    this.state['displayAlertMessage']
      ? this.setState({ displayAlertMessage: false })
      : this.setState({ displayAlertMessage: true });
  }

  render() {
    return (
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
    );
  }
}

export default App;
