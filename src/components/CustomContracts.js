import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import shortid from 'shortid';
import ContractItem from './elements/ContractItem.js';
import { displayModal } from './../actions/actions.js';

const ContractDescription = () => {
  return (
    <React.Fragment>
      <h2>Custom Contracts</h2>
      <p>
        To watch and interact with a contract already deployed on the
        blockchain, you need to know its address and the description of its
        interface in JSON format.
      </p>
      <div className="dapp-clear-fix" />
    </React.Fragment>
  );
};

export class CustomContracts extends Component {
  shouldComponentUpdate(prevProps, prevState) {
    if (!isEqual(prevProps.ObservedContracts, this.props.ObservedContracts)) {
      return true;
    }
    return false;
  }

  renderWatchContractButton() {
    return (
      <React.Fragment>
        <button
          className="wallet-box create add-contract"
          onClick={() => this.props.displayModal('displayWatchContract')}
        >
          <div className="account-pattern">+</div>
          <h3>WATCH CONTRACT</h3>
        </button>
        <div className="dapp-clear-fix" />
      </React.Fragment>
    );
  }

  renderObservedContracts() {
    let oc = this.props.ObservedContracts;
    if (oc !== undefined && Object.keys(oc).length !== 0) {
      return (
        <React.Fragment>
          <div className="wallet-box-list">
            {Object.keys(oc).map(contract => (
              <ContractItem
                key={shortid.generate()}
                contract={oc[contract]}
                addressType="ObservedContracts"
              />
            ))}
          </div>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div className="contracts-view-custom-contracts">
        <ContractDescription />
        {this.renderObservedContracts()}
        {this.renderWatchContractButton()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ObservedContracts: state.reducers.ObservedContracts,
});

export default connect(
  mapStateToProps,
  { displayModal }
)(CustomContracts);
