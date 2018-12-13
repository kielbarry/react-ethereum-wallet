import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// actions
import {
  fetchEthGasStationStats,
  closeModal,
  updateConnectedNetwork,
  setWallets,
  updateTotalBalance,
  updateBlockHeader,
  updateTransactionConfirmation,
  updateTransaction,
  createInitWalletContract,
  updateEtherPrices,
} from './actions/actions.js';
import * as Utils from './utils/utils.js';
import * as WalletUtils from './utils/WalletUtils.js';

// views
import LandingPage from './views/LandingPage.js';
import ViewContainer from './views/ViewContainer.js';

// Modals
import ModalContainer from './components/modals/ModalContainer.js';
import NavBar from './components/Navbar';

// stylesheets
import './stylesheets/mergedstyles.css';
import './App.css';

import Web3Initializer from './web3/Web3Initializer.js';

export class App extends Component {
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
        // do once to load on init, then repeat later to update balances
        try {
          Utils.checkNetwork(web3, this.props.updateConnectedNetwork);
          Utils.getAccounts(
            web3,
            this.props.setWallets,
            this.props.updateTotalBalance
          );
        } catch (err) {
          console.error('error', err);
        }

        try {
          web3.eth.subscribe('newBlockHeaders', (err, b) => {
            if (!err) {
              this.props.updateBlockHeader({
                gasLimit: b.gasLimit,
                gasUsed: b.gasUsed,
                number: b.number
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                size: b.size,
                timestamp: b.timestamp,
              });
              web3.eth.net.getPeerCount().then(this.props.updatePeerCount);
            }
            Utils.getAccounts(
              web3,
              this.props.setWallets,
              this.props.updateTotalBalance
            );
            Utils.updateTransactionConfirmation(
              b,
              web3,
              this.props.Transactions,
              this.props.updateTransactionConfirmation
            );
            Utils.updatePendingConfirmations(
              b,
              web3,
              this.props.Transactions,
              this.props.updateTransaction
            );
          });
        } catch (err) {
          console.warn('web3 provider not open', err);
          return err;
        }

        //TODO: is this necessary? what was the purpose?
        // try {
        //   this.props.createInitWalletContract(
        //     WalletUtils.initWalletContact(web3)
        //   );
        // } catch (err) {
        //   console.error('error', err);
        // }
      }
    }, 1000);
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
          <NavBar />
          <ViewContainer />
          <ModalContainer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  Transactions: state.reducers.Transactions,
  web3: state.web3,
});

export default connect(
  mapStateToProps,
  {
    fetchEthGasStationStats,
    closeModal,
    updateConnectedNetwork,
    setWallets,
    updateTotalBalance,
    updateBlockHeader,
    updateTransactionConfirmation,
    updateTransaction,
    createInitWalletContract,
    updateEtherPrices,
  }
)(App);
