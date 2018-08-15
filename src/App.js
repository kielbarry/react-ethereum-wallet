
// modules
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
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

// Modals
import NoConnection from './components/views/modals/NoConnection.jsx';

// stylesheets
import './stylesheets/mergedstyles.css';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {}

    console.log(this.state)
    console.log(this.props)
    console.log(props)
  }

  componentDidMount(){
    // this.props.dispatch(updateConnectedNetwork())

    // console.log(window.web3)
    // console.log(typeof web3)
    // // console.log(web3)
    // if (window.web3 === undefined || typeof web3 === 'undefined') {
    //   console.log("there isn't web3")
    //  this.setState({
    //     noConnection: true,
    //   })

    //  let web3 = new Web3('ws://localhost:8546');
    //  web3.eth.isSyncing().then(resp => console.log(resp))

    //  let blockheader = web3.eth.subscribe('newBlockHeaders')
    //  console.log(blockheader)



    // } else {
    //   console.log("there is web3")
    //   this.setState({
    //     noConnection: false,
    //   })
    // }

    // this.setState({
    //   displayAlertMessage: false,
    //   alertKey: 'alert_20171104-hidden',
    //   peerCountIntervalId: null
    // });

  }

  componentDidUpdate(prevProps, prevState, snapShot){
    console.log(prevProps)
    console.log(prevState)
    console.log(snapShot)
    console.log(this.prevProps)
    console.log(this.prevState)
    console.log(this.snapShot)
  }


  // toggleAlertMessage(e) {
  //   this.state['displayAlertMessage']
  //     ? this.setState({ displayAlertMessage: false })
  //     : this.setState({ displayAlertMessage: true });
  // }

  // toggleNoConnection(e) {
  //    console.log(window.web3)
    
  //   console.log("in noConnection", window)
  //   this.state['noConnection']
  //     ? this.setState({ noConnection: false })
  //     : this.setState({ noConnection: true });
  // }

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


              <NoConnection 
              validStyles={this.props.noConnection}
              onClick={() => this.toggleNoConnection()}
              />

              <MistAlert
                validStyles={this.props.displayAlertMessage}
                onClick={() => this.toggleAlertMessage()}
              />
              <MistAlertBubble
                validStyles={this.props.displayAlertMessage}
                onClick={() => this.toggleAlertMessage()}
              />
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(App);
