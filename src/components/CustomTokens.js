import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import TokenBox from './elements/TokenBox.js';
import { ContractSectionList } from './../constants/FieldConstants.js';
import * as Actions from './../actions/actions.js';

const TokenDescription = () => {
  let CT = ContractSectionList.CustomTokens;
  return (
    <React.Fragment>
      <h2>{CT.title}</h2>
      <p>{CT.contractDescription}</p>
      <div className="dapp-clear-fix" />
    </React.Fragment>
  );
};

class CustomTokens extends Component {
  shouldComponentUpdate(prevProps, prevState) {
    if (
      !isEqual(
        prevProps.reducers.ObservedTokens,
        this.props.reducers.ObservedTokens
      )
    ) {
      return true;
    }
    return false;
  }

  renderWatchContractButton() {
    let CC = ContractSectionList.CustomContracts;
    return (
      <React.Fragment>
        <button
          className={CC.buttonClass}
          onClick={() => this.props.displayModal('displayWatchContract')}
        >
          <div className="account-pattern">+</div>
          <h3>{CC.buttonDescription}</h3>
        </button>
        <div className="dapp-clear-fix" />
      </React.Fragment>
    );
  }

  renderObservedTokens() {
    let obj = this.props.reducers;
    if (
      obj.ObservedTokens !== undefined &&
      Object.keys(obj.ObservedTokens).length !== 0
    ) {
      let tokens = this.props.reducers.ObservedTokens;
      return (
        <React.Fragment>
          <button className="wallet-box-list">
            {Object.keys(tokens).map(token => (
              <TokenBox key={tokens[token].address} token={tokens[token]} />
            ))}
          </button>
        </React.Fragment>
      );
    }
  }

  renderAddTokenButton() {
    let CT = ContractSectionList.CustomTokens;
    return (
      <React.Fragment>
        <button
          className={CT.buttonClass}
          onClick={() => this.props.displayModal('displayWatchToken')}
          style={{ float: 'left' }}
        >
          <div className="account-pattern">+</div>
          <h3>{CT.buttonDescription}</h3>
        </button>
      </React.Fragment>
    );
  }

  autoScanTokens(e) {
    let r = this.props.reducers;
    let addresses = [
      ...Object.keys(r.Wallets),
      ...Object.keys(r.ObservedContracts).map(key => {
        return r.ObservedContracts[key].address;
      }),
      ...Object.keys(r.ObservedContracts).map(key => {
        return r.ObservedContracts[key].address;
      }),
    ];
    this.props.fetchTokensForAutoScan(addresses);
  }

  renderAutoScan() {
    return (
      <React.Fragment>
        {this.props.reducers.network === 'main' ? (
          <button
            className="wallet-box create token-auto-scan"
            title="Automatically scan for balances of popular tokens on your accounts."
            onClick={e => this.autoScanTokens(e)}
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

  render() {
    return (
      <div className="contracts-view-custom-tokens">
        <TokenDescription />
        {this.renderObservedTokens()}
        {this.renderAddTokenButton()}
        {this.renderAutoScan()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(CustomTokens);
