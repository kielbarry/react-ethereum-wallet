import React, { Component } from 'react';

import isEqual from 'lodash/isEqual';

import AddForm from '../AddForm.jsx';
import { connect } from 'react-redux';

import ContractItem from '../elements/ContractItem.jsx';
import TokenBox from '../elements/TokenBox.jsx';

import { ContractSectionList } from '../../constants/FieldConstants.jsx';

import * as Actions from '../../actions/actions.js';

class ContractsView extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

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

  renderObservedContracts() {
    let obj = this.props.reducers;
    if (
      obj.ObservedContracts !== undefined &&
      Object.keys(obj.ObservedContracts).length !== 0
    ) {
      const contracts = this.props.reducers.ObservedContracts;
      return (
        <React.Fragment>
          <div className="wallet-box-list">
            {Object.keys(contracts).map(contract => (
              <ContractItem
                key={contract.address}
                contract={contracts[contract]}
              />
            ))}
          </div>
        </React.Fragment>
      );
    }
  }

  render() {
    let CSL = ContractSectionList;
    let CC = CSL.CustomContracts;
    let CT = CSL.CustomTokens;
    return (
      <div className="dapp-container">
        <h1>
          <strong>Contracts</strong>
        </h1>

        <AddForm
          key={`contracts-view-deply-contract}`}
          field={CSL.DeployContract}
        />

        <div className="contracts-view-custom-contracts">
          <h2>{CC.title}</h2>
          <p>{CC.contractDescription}</p>
          <div className="dapp-clear-fix" />

          {this.renderObservedContracts()}

          <button
            className={CC.buttonClass}
            onClick={() => this.props.displayModal('displayWatchContract')}
          >
            <div className="account-pattern">+</div>
            <h3>{CC.buttonDescription}</h3>
          </button>
          <div className="dapp-clear-fix" />
        </div>

        <div className="contracts-view-custom-tokens">
          <h2>{CT.title}</h2>
          <p>{CT.contractDescription}</p>
          <div className="dapp-clear-fix" />

          {this.renderObservedTokens()}

          <button
            className={CT.buttonClass}
            onClick={() => this.props.displayModal('displayWatchToken')}
          >
            <div className="account-pattern">+</div>
            <h3>{CT.buttonDescription}</h3>
          </button>
          <div className="dapp-clear-fix" />
        </div>
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
)(ContractsView);
