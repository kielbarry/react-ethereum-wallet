import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// actions
import * as Actions from './actions/actions.js';
import * as Utils from './utils/utils.js';
import * as WalletUtils from './utils/WalletUtils.js';

// views
import LandingPage from './components/views/LandingPage.js';
import ViewContainer from './components/views/ViewContainer.js';
import ModalContainer from './components/modals/ModalContainer.js';

import NavBar from './components/Navbar';

// stylesheets
import './stylesheets/mergedstyles.css';
import './App.css';

import Web3Initializer from './web3/Web3Initializer.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.getCryptoComparePrices = this.getCryptoComparePrices.bind(this);

    this.getCryptoComparePrices();
    this.CryptoCompareInterval = setInterval(
      () => this.getCryptoComparePrices(),
      15000
    );

    this.props.fetchEthGasStationStats();
    this.GasInterval = setInterval(
      () => this.props.fetchEthGasStationStats(),
      15000
    );
    this.props.closeModal('displayEventInfo');
    let web3Returned = setInterval(() => {
      if (this.props.web3 != null) {
        clearInterval(web3Returned);
        let web3 = this.props.web3.web3Instance;
        try {
          Utils.checkNetwork(web3, this.props.updateConnectedNetwork);
        } catch (err) {
          console.error('network check not available');
        }
        try {
          Utils.getAccounts(
            web3,
            this.props.setWallets,
            this.props.updateTotalBalance
          );
        } catch (err) {
          console.error('error', err);
        }
        try {
          Utils.getNewBlockHeaders(
            web3,
            this.props.updateBlockHeader,
            this.props.updatePeerCount
          );
        } catch (err) {
          console.error('error', err);
        }
        try {
          this.props.createInitWalletContract(
            WalletUtils.initWalletContact(web3)
          );
        } catch (err) {
          console.error('error', err);
        }
      }
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.reducers.Web3Initializer !== this.props.reducers.Web3Initializer
    ) {
      // console.log(prevProps.reducers.Web3Initializer)
      // console.log(this.props.reducers.Web3Initializer)
      console.log(Web3Initializer);
      // console.log(Web3Initializer.init)
      console.log(Web3Initializer.init());
    }
  }

  getCryptoComparePrices() {
    Utils.getCryptoComparePrices().then(exchangeRates => {
      this.props.updateEtherPrices(exchangeRates);
    });
  }

  componentWillUnmount() {
    clearInterval(this.CryptoCompareInterval);
    clearInterval(this.GasInterval);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={LandingPage} />
          {/*}
            if web3 connected, display rest
          */}
          <NavBar />
          <ViewContainer />
          {/*<ModalContainer />*/}
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(App);
