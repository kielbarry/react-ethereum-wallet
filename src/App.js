
// modules
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import cn from 'classnames';


// actions
import * as Actions  from './actions/actions.js';
import * as Utils from './utils/utils.js';

// views
import AccountView from './components/views/account.js';
import SingleAccountView from './components/views/SingleAccountView.jsx';
import ContractsView from './components/views/contracts.js';
import SendContractForm from './components/views/send.js';
import NavBar from './components/navbar';

// components
// import MistAlert from './components/mistAlert.js';
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
        Utils.checkNetwork(web3, this.props.updateConnectedNetwork);
        this.props.updateProvider(Utils.nameProvider(web3.currentProvider));
        Utils.getAccounts(web3, this.props.setWallets);
        Utils.getNewBlockHeaders(web3, this.props.updateBlockHeader, this.props.updatePeerCount);
      }
    }, 1000);
  }

  componentDidMount(){
    window.addEventListener('blur', (e) => document.body.classList.add('app-blur'));
    window.addEventListener('focus',(e) => document.body.classList.remove('app-blur'));
  }

  toggleNoConnection(e) {
    this.state['noConnection']
      ? this.setState({ noConnection: false })
      : this.setState({ noConnection: true });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="App">
            <NavBar />
            <div className="dapp-flex-content">
              <main className="dapp-content">
                <div>
                  <Route path="/account/*" component={SingleAccountView} />
                  <Route exact path="/" component={AccountView} />
                  <Route exact path="/send-from" component={SendContractForm} />
                  <Route exact path="/contracts" component={ContractsView} />
                </div>
                
                <NoConnection />

                <MistAlertBubble />

              </main>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {...Actions})(App);
