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

    var classNames = require( 'classnames' );

    var alertKey = 'alert_20171104-hidden';

    this.state = {
      'displayAlertMessage': {
        value: false,
        bubbleStyle: "",
        warningStyle : "is-hidden",
      }, 
      'alertKey':  'alert_20171104-hidden',
    }

    console.log(localStorage.getItem(alertKey))

    // this.toggleAlertMessage = this.toggleAlertMessage.bind(this);
  }

  toggleAlertMessage(e){
    this.state['displayAlertMessage'].value 
    ? this.setState({ displayAlertMessage: { value: false, bubbleStyle: "", warningStyle: "is-hidden"} }) 
    : this.setState({ displayAlertMessage: { value: true, bubbleStyle: "is-hidden", warningStyle: ""} })

    console.log(this.state)
  }


  render() {
    return (
      <div>
        <div className="App">
          <NavBar />    
          <div className="dapp-flex-content">
            <main className="dapp-content">
              <Contracts />
             {/* <MistAlert /> */}
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
