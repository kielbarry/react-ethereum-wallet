import React, { Component } from 'react';
// import TokenBox from '../elements/tokenbox.js';

import AddForm from '../AddForm.jsx';
import { connect } from 'react-redux';

// import WatchContract from './modals/WatchContract.jsx';

import ContractItem from '../elements/ContractItem.jsx';

// import PageHeader from '../elements/PageHeaders.jsx';
// import { ContractPageHeader } from '../../constants/FieldConstants.jsx';
// import { DefaultContractList } from '../../constants/FieldConstants.jsx';

import { ContractSectionList } from '../../constants/FieldConstants.jsx';

class ContractsView extends Component {
  renderObservedContracts() {
    if (this.props.reducers.ObservedContracts !== undefined) {
      const contracts = this.props.reducers.ObservedContracts;
      return (
        <React.Fragment>
          <div className="wallet-box-list">
            {Object.keys(contracts).map(contract => (
              <ContractItem
                key={contract.address}
                // number={i + 1}
                // address={address}
                contract={contracts[contract]}
                // props={this.props}
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
