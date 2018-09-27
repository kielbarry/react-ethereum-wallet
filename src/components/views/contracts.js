import React, { Component } from 'react';
// import TokenBox from '../elements/tokenbox.js';
import isEqual from 'lodash/isEqual';

import AddForm from '../AddForm.jsx';
import { connect } from 'react-redux';

// import WatchContract from './modals/WatchContract.jsx';

import ContractItem from '../elements/ContractItem.jsx';
import TokenBox from '../elements/TokenBox.jsx';
// import PageHeader from '../elements/PageHeaders.jsx';
// import { ContractPageHeader } from '../../constants/FieldConstants.jsx';
// import { DefaultContractList } from '../../constants/FieldConstants.jsx';

import { ContractSectionList } from '../../constants/FieldConstants.jsx';

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

  renderObservedTokens() {
    let obj = this.props.reducers;
    if (
      obj.ObservedTokens !== undefined &&
      Object.keys(obj.ObservedTokens).length !== 0
    ) {
      let tokens = this.props.reducers.ObservedTokens;
      return (
        <React.Fragment>
          <button className="wallet-box list">
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
    return (
      <div className="dapp-container">
        <h1>
          <strong>Contracts</strong>
        </h1>

        <AddForm
          key={`contracts-view-deply-contract}`}
          field={CSL.DeployContract}
        />

        <div className="dapp-clear-fix" />
        {this.renderObservedContracts()}

        <AddForm
          key={`contracts-view-custom-contracts`}
          field={CSL.CustomContracts}
        />

        {this.renderObservedTokens()}

        <AddForm
          key={`contracts-view-custom-tokens`}
          field={CSL.CustomTokens}
        />

        {/*{DefaultContractList.map((field, i) => <AddForm key={`contracts-view-${i}`} field={field} />)} */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(ContractsView);
