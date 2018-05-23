import React, { Component } from 'react';
import './App.css';

import AccountView from './components/views/account.js'
import MistAlert from './components/mistAlert.js'

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
  render() {
    return (
    
    <div>
     

      <div className="App">
        <NavBar />

        <div className="dapp-flex-content">

          <MistAlert />

          <div className="show-alert alert-button"></div>
          <AccountView />
        </div>
      </div>
    
    </div>
      
    );
  }
}

export default App;
