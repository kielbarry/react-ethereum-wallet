import React, { Component } from 'react';
import './App.css';

import AccountView from './components/views/account.js'
import MistAlert from './components/mistAlert.js'
import MistAlertBubble from './components/mistAlertBubble.js'

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

    this.state = {
      'displayAlertMessage': false
    }

    // this.toggleAlertMessage = this.toggleAlertMessage.bind(this);
  }

  toggleAlertMessage(e){
    console.log(this.state)
    this.state['displayAlertMessage'] ? this.setState({ displayAlertMessage: false }) : this.setState({ displayAlertMessage: true })
  }


  render() {




    return (
      


    <div>
     

      <div className="App">

        <NavBar />    

        <div className="dapp-flex-content">
          <main className="dapp-content">

            <MistAlert />
            <MistAlertBubble />
            <AccountView />

          
          </main>

        </div>
      </div>
    
    </div>
      
    );
  }
}

export default App;
