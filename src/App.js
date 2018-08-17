
// modules
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Provider, connect } from  'react-redux';
// import Web3 from 'web3';

// import store from './store/store.js';

// actions
import * as Actions  from './actions/actions.js';

import * as Utils from './utils/utils.js';

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

    let web3Returned = setInterval(()=>{ 
      
      if(this.props.web3 != null) {

        clearInterval(web3Returned)

        let web3 = this.props.web3.web3Instance
        console.log(this.props.web3.web3Instance)


        Utils.checkNetwork(web3, this.props.updateConnectedNetwork)
        this.props.updateProvider(Utils.nameProvider(web3.currentProvider))

        Utils.getAccounts(web3, this.props.setWallets)
        Utils.getNewBlocks(web3, this.props.updateBlockHeader, this.props.updatePeerCount())

      }
    }, 1000);

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


  toggleAlertMessage(e) {
    this.state['displayAlertMessage']
      ? this.setState({ displayAlertMessage: false })
      : this.setState({ displayAlertMessage: true });
  }


  toggleNoConnection(e) {
    this.state['noConnection']
      ? this.setState({ noConnection: false })
      : this.setState({ noConnection: true });
  }

  observeLatestBlocks() {

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
