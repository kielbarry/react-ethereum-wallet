
// modules
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Provider, connect } from  'react-redux';
import Web3 from 'web3';

// import store from './store/store.js';

// actions
import * as Actions  from './actions/actions.js';

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

    // let hasCurrentBlock = setInterval(() => {
    //   console.log("inside has currentblock", this.state)
    //   console.log("inside has currentblock", this.props)
    //   console.log("inside has currentblock", props)
    //   // if(currentBlock != undefined) {
    //   //   clearInterval(hasCurrentBlock);
    //   //   setConsole();
    //   // }
    // }, 1000);

    this.observeLatestBlocks = this.observeLatestBlocks.bind(this);
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

   toggleAlertMessage(e) {
    this.props.reducers.displayAlertMessage
      ? this.props.reducers.displayAlertMessage = false
      : this.props.reducers.displayAlertMessage = true
  }


  toggleNoConnection(e) {
     console.log(window.web3)
    
    console.log("in noConnection", window)
    this.state['noConnection']
      ? this.setState({ noConnection: false })
      : this.setState({ noConnection: true });
  }

  observeLatestBlocks() {

    setInterval(function() {
      console.log(this.props)
      console.log(this.state)
      // console.log(props)
      // console.log(state)

    }, 1000);

  }
  render() {
    // this.observeLatestBlocks();
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
              validStyles={this.props.reducers.noConnection}
              onClick={() => this.toggleNoConnection()}
              />

              <MistAlert
                validStyles={this.props.reducers.displayAlertMessage}
                onClick={() => this.toggleAlertMessage()}
              />
              <MistAlertBubble
                validStyles={this.props.reducers.displayAlertMessage}
                onClick={() => this.toggleAlertMessage()}
              />
            </main>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {...Actions})(App);
