import React, { Component } from 'react';
import './App.css';

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
      </div>
    
    </div>
      
    );
  }
}

export default App;
