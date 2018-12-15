import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import web3 from './web3';

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
} from './actions/actions';
import * as Utils from './utils/utils';
// import * as WalletUtils from './utils/WalletUtils';

// views
import ViewContainer from './views/ViewContainer';

// Modals
import ModalContainer from './components/modals/ModalContainer';
import NavBar from './components/Navbar';

// stylesheets
import './stylesheets/mergedstyles.css';
import './App.css';

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

    // this.props.closeModal('displayEventInfo');
  }

  componentDidMount() {
    this.getEverything();
  }

  getEverything() {
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
            number: b.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
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
          <NavBar />
          <ViewContainer />
          <ModalContainer />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  Transactions: PropTypes.object,
  updatePeerCount: PropTypes.func,
  fetchEthGasStationStats: PropTypes.func,
  closeModal: PropTypes.func,
  updateConnectedNetwork: PropTypes.func,
  setWallets: PropTypes.func,
  updateTotalBalance: PropTypes.func,
  updateBlockHeader: PropTypes.func,
  updateTransactionConfirmation: PropTypes.func,
  updateTransaction: PropTypes.func,
  createInitWalletContract: PropTypes.func,
  updateEtherPrices: PropTypes.func,
};

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
