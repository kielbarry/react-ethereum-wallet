import React, { Component } from 'react';
import './App.css';

import AccountView from './components/views/account.js'
import ContractsView from './components/views/contracts.js'
import SendContractForm from './components/views/send.js'

import MistAlert from './components/mistAlert.js'
import MistAlertBubble from './components/mistAlertBubble.js'

import './stylesheets/mergedstyles.css'


import NavBar from './components/navbar';


import { BrowserRouter, Link, Route } from 'react-router-dom'


class App extends Component {

  constructor(props) {
    super(props);

    var cn = require( 'classnames' );

    this.state = {
      'displayAlertMessage': false,
      'alertKey':  'alert_20171104-hidden',
      'peerCountIntervalId': null,
    }

  }

  toggleAlertMessage(e){
    this.state['displayAlertMessage'] ? this.setState({ displayAlertMessage: false}) : this.setState({ displayAlertMessage: true})
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
                <Route exact path="/" component={AccountView}/>
                <Route exact path="/send-from" component={SendContractForm}/>
                <Route exact path="/contracts" component={ContractsView}/>
              </div>
            </BrowserRouter>

              <MistAlert 
              validStyles={this.state.displayAlertMessage}
              onClick={ ()=> this.toggleAlertMessage() }  />
              <MistAlertBubble 
              validStyles={this.state.displayAlertMessage}
              onClick={ ()=> this.toggleAlertMessage() } />

            </main>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
