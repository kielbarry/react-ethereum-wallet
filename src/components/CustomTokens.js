import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import TokenBox from './elements/TokenBox.js';
import ButtonDescription from './ButtonDescription.js';
import { displayModal, fetchTokensForAutoScan } from './../actions/actions.js';

const buttonTitle = 'Custom Tokens';
const buttonDescription =
  'Tokens are currencies and other fungibles built on the Ethereum platform. In order for accounts to watch for tokens and send them, you have to add their address to this list. You can create your own token by simply modifying this example of a custom token contract or learning more about Ethereum Tokens.';

export class CustomTokens extends Component {
  shouldComponentUpdate(prevProps, prevState) {
    if (!isEqual(prevProps.ObservedTokens, this.props.ObservedTokens)) {
      return true;
    }
    return false;
  }

  // snapshotted
  renderObservedTokens() {
    let ot = this.props.ObservedTokens;
    if (ot !== undefined && Object.keys(ot).length !== 0) {
      return (
        <React.Fragment>
          <button className="wallet-box-list">
            {Object.keys(ot).map(token => (
              <TokenBox key={ot[token].address} token={ot[token]} />
            ))}
          </button>
        </React.Fragment>
      );
    }
  }

  // snapshotted
  renderAddTokenButton() {
    return (
      <React.Fragment>
        <button
          className="wallet-box create add-token"
          onClick={() => this.props.displayModal('displayWatchToken')}
          style={{ float: 'left' }}
        >
          <div className="account-pattern">+</div>
          <h3>WATCH CUSTOM TOKEN</h3>
        </button>
      </React.Fragment>
    );
  }

  // TODO: use utility combineWallets
  autoScanTokens(e) {
    let wallets = this.props.Wallets;
    let oc = this.props.ObservedContracts;
    let addresses = [
      ...Object.keys(wallets),
      ...Object.keys(oc).map(key => {
        return oc[key].address;
      }),
      ...Object.keys(oc).map(key => {
        return oc[key].address;
      }),
    ];
    this.props.fetchTokensForAutoScan(addresses);
  }

  // snapshotted
  renderAutoScan() {
    return (
      <React.Fragment>
        {this.props.network === 'main' ? (
          <button
            className="wallet-box create token-auto-scan"
            title="Automatically scan for balances of popular tokens on your accounts."
            onClick={this.autoScanTokens()}
          >
            <div className="account-pattern">
              <div className="icon icon-target" />
            </div>
            <h3>Auto-Scan</h3>
          </button>
        ) : null}
        <div className="dapp-clear-fix" />
      </React.Fragment>
    );
  }

  // not snapshotted
  render() {
    return (
      <div className="contracts-view-custom-tokens">
        <ButtonDescription
          title={buttonTitle}
          description={buttonDescription}
        />
        {this.renderObservedTokens()}
        {this.renderAddTokenButton()}
        {this.renderAutoScan()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  network: state.reducers.network,
  ObservedTokens: state.reducers.ObservedTokens,
  Wallets: state.reducers.Wallets,
  ObservedContracts: state.reducers.ObservedContracts,
});

export default connect(
  mapStateToProps,
  { displayModal, fetchTokensForAutoScan }
)(CustomTokens);
