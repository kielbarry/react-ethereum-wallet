import React, { Component } from 'react';
// import TokenBox from '../elements/tokenbox.js';

import AddForm from '../AddForm.jsx';

import WatchContract from './modals/WatchContract.jsx';

// import PageHeader from '../elements/PageHeaders.jsx';
// import { ContractPageHeader } from '../../constants/FieldConstants.jsx';
// import { DefaultContractList } from '../../constants/FieldConstants.jsx';

import { ContractSectionList } from '../../constants/FieldConstants.jsx';

class ContractsView extends Component {
  render() {
    let CSL = ContractSectionList;
    return (
      <div className="dapp-container">
        <h1><strong>Contracts</strong></h1>

        {/*<WatchContract /> */}
        <WatchContract />
        <AddForm
          key={`contracts-view-deply-contract}`}
          field={CSL.DeployContract}
        />
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

export default ContractsView;
