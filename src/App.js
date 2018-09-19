// modules
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { spring, AnimatedSwitch } from 'react-router-transition';
// import cn from 'classnames';

// actions
import * as Actions from './actions/actions.js';
import * as Utils from './utils/utils.js';
import * as WalletUtils from './utils/WalletUtils.js';

// views
import AccountView from './components/views/account.js';
import SingleAccountView from './components/views/SingleAccountView.jsx';
import ContractsView from './components/views/contracts.js';
import SendContractForm from './components/views/send.js';
import NavBar from './components/navbar';

// components
import MistAlertBubble from './components/mistAlertBubble.js';
import GlobalNotifications from './components/elements/GlobalNotifications.jsx';

// Modals
import NoConnection from './components/views/modals/NoConnection.jsx';

// stylesheets
import './stylesheets/mergedstyles.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    let web3Returned = setInterval(() => {
      if (this.props.web3 != null) {
        clearInterval(web3Returned);
        let web3 = this.props.web3.web3Instance;
        Utils.checkNetwork(web3, this.props.updateConnectedNetwork);
        this.props.updateProvider(Utils.nameProvider(web3.currentProvider));
        Utils.getAccounts(
          web3,
          this.props.setWallets,
          this.props.updateTotalBalance
        );
        Utils.getNewBlockHeaders(
          web3,
          this.props.updateBlockHeader,
          this.props.updatePeerCount
        );
        this.props.createInitWalletContract(
          WalletUtils.initWalletContact(web3)
        );
      }
    }, 1000);
  }

  componentDidMount() {
    setInterval(() => {
      Utils.getCryptoComparePrices().then(exchangeRates => {
        this.props.updateEtherPrices(exchangeRates);
      });
    }, 15000);
    window.addEventListener('blur', e =>
      document.body.classList.add('app-blur')
    );
    window.addEventListener('focus', e =>
      document.body.classList.remove('app-blur')
    );
  }

  // displayPriceFormatter() {
  //   let web3 = this.props.web3.web3Instance;
  //   let currency = this.props.reducers.currency;
  //   let totalBalance = this.props.reducers.totalBalance.toString();
  //   let exchangeRates = this.props.reducers.exchangeRates;
  //   if (exchangeRates === undefined || exchangeRates === null) return;
  //   let displayPrice;
  //   if (currency === 'FINNEY') {
  //     displayPrice = web3.utils.fromWei(totalBalance, 'finney');
  //   } else {
  //     displayPrice = web3.utils.fromWei(totalBalance, 'ether');
  //     if (currency !== 'ETHER') {
  //       displayPrice = Number(
  //         Math.round(
  //           displayPrice * exchangeRates[currency.toLowerCase()] + 'e2'
  //         ) + 'e-2'
  //       );
  //     }
  //   }
  //   this.props.updateDisplayValue(displayPrice);
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.reducers.totalBalance !== prevProps.reducers.totalBalance ||
      this.props.reducers.currency !== prevProps.reducers.currency ||
      !Object.is(
        this.props.reducers.exchangeRates,
        prevProps.reducers.exchangeRates
      )
    ) {
      this.props.updateDisplayValue(Utils.displayPriceFormatter(this.props));
    }
  }

  render() {
    // we need to map the `scale` prop we define below
    // to the transform style property
    function mapStyles(styles) {
      return { opacity: styles.opacity, transform: `scale(${styles.scale})` };
    }
    // wrap the `spring` helper to use a bouncy config
    function bounce(val) {
      return spring(val, { stiffness: 330, damping: 22 });
    }
    // child matches will...
    const bounceTransition = {
      // start in a transparent, upscaled state
      atEnter: { opacity: 0, scale: 1.2 },
      // leave in a transparent, downscaled state
      atLeave: { opacity: bounce(0), scale: bounce(0.8) },
      // and rest at an opaque, normally-scaled state
      atActive: { opacity: bounce(1), scale: bounce(1) },
    };
    return (
      <BrowserRouter>
        <div>
          <div className="App">
            <NavBar />

            <div className="dapp-flex-content">
              <main className="dapp-content">
                <div>
                  <AnimatedSwitch
                    atEnter={bounceTransition.atEnter}
                    atLeave={bounceTransition.atLeave}
                    atActive={bounceTransition.atActive}
                    mapStyles={mapStyles}
                  >
                    <Route path="/account/*" component={SingleAccountView} />
                    <Route exact path="/" component={AccountView} />
                    <Route
                      exact
                      path="/send-from"
                      component={SendContractForm}
                    />
                    <Route exact path="/contracts" component={ContractsView} />
                  </AnimatedSwitch>
                </div>
                <MistAlertBubble />
              </main>
            </div>
            {/*
            <GlobalNotifications />
          */}
            <NoConnection connection={this.props.web3} />
          </div>
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
