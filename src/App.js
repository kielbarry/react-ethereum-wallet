import React, { Component } from 'react';
import './App.css';

import AccountView from './components/views/account.js'
import MistAlert from './components/mistAlert.js'
import MistAlertBubble from './components/mistAlertBubble.js'
import Contracts from './components/views/contracts.js'

import './stylesheets/mergedstyles.css'

import { 
	Router, 
	Route, 
	Link, 
	IndexRoute, 
	hashHistory, 
	browserHistory 
} from 'react-router'

import NavBar from './components/navbar';



class App extends Component {

  constructor(props) {
    super(props);

    var cn = require( 'classnames' );

    var alertKey = 'alert_20171104-hidden';

    this.state = {
      'displayAlertMessage': false,
      // {
      //   value: false,
      //   bubbleStyle: "",
      //   warningStyle : "is-hidden",
      // }, 
      'alertKey':  'alert_20171104-hidden',
    }

    // this.toggleAlertMessage = this.toggleAlertMessage.bind(this);
  }

  toggleAlertMessage(e){
    this.state['displayAlertMessage'] 
    ? this.setState({ displayAlertMessage: false}) 
    : this.setState({ displayAlertMessage: true})
  }


  render() {
    return (
      <div>
        <div className="App">
          <NavBar />    
          <div className="dapp-flex-content">
            <main className="dapp-content">
              <Contracts />
              <MistAlert validStyles={this.state.displayAlertMessage} onClick={ ()=> this.toggleAlertMessage() }  />
              <MistAlertBubble validStyles={this.state.displayAlertMessage}  onClick={ ()=> this.toggleAlertMessage() } />
              <AccountView />
            </main>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
