import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import shortid from 'shortid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import ContractItem from '../elements/ContractItem.js';
import TokenBox from '../elements/TokenBox.js';
import { ContractSectionList } from '../../constants/FieldConstants.js';
import * as Actions from '../../actions/actions.js';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class ContractsView extends Component {
  shouldComponentUpdate(prevProps, prevState) {
    if (
      !isEqual(
        prevProps.reducers.ObservedTokens,
        this.props.reducers.ObservedTokens
      ) ||
      !isEqual(
        prevProps.reducers.ObservedContracts,
        this.props.reducers.ObservedContracts
      )
    ) {
      return true;
    }
    return false;
  }

  renderTitle() {
    return (
      <h1>
        <strong>Contracts</strong>
      </h1>
    );
  }

  renderContractDescription() {
    let CC = ContractSectionList.CustomContracts;
    return (
      <React.Fragment>
        <h2>{CC.title}</h2>
        <p>{CC.contractDescription}</p>
        <div className="dapp-clear-fix" />
      </React.Fragment>
    );
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

  renderObservedContracts() {
    let obj = this.props.reducers;
    if (
      obj.ObservedContracts !== undefined &&
      Object.keys(obj.ObservedContracts).length !== 0
    ) {
      const contracts = this.props.reducers.ObservedContracts;
      console.log('RENDERING OBSERVED Contracts', contracts);
      return (
        <React.Fragment>
          <div className="wallet-box-list">
            {Object.keys(contracts).map(contract => (
              <ContractItem
                key={shortid.generate()}
                contract={contracts[contract]}
              />
            ))}
          </div>
        </React.Fragment>
      );
    }
  }

  renderCustomContracts() {
    return (
      <div className="contracts-view-custom-contracts">
        {this.renderContractDescription()}
        {this.renderObservedContracts()}
        {this.renderWatchContractButton()}
      </div>
    );
  }

  renderTokenDescription() {
    let CT = ContractSectionList.CustomTokens;
    return (
      <React.Fragment>
        <h2>{CT.title}</h2>
        <p>{CT.contractDescription}</p>
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

  renderCustomTokens() {
    return (
      <div className="contracts-view-custom-tokens">
        {this.renderTokenDescription()}
        {this.renderObservedTokens()}
        {this.renderAddTokenButton()}
        {this.renderAutoScan()}
      </div>
    );
  }

  render() {
    return (
      <div className="dapp-container">
        {this.renderTitle()}
        {this.renderCustomContracts()}
        {this.renderCustomTokens()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default compose(
  withStyles(styles, { name: 'ContractsView' }),
  connect(
    mapStateToProps,
    { ...Actions }
  )
)(ContractsView);
