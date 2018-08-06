import React, { Component } from 'react';
// import TokenBox from '../elements/tokenbox.js';

import AddForm from '../AddForm.jsx';

// import Modal from './modals/WatchItem.jsx';

import PageHeader from '../elements/PageHeaders.jsx';
import { ContractPageHeader, DefaultContractList } from '../../constants/FieldConstants.jsx';


class ContractsView extends Component {
  render() {
    return (
      <div className="dapp-container">
        
        <PageHeader title={ContractPageHeader} />


        {DefaultContractList.map((field, i) => <AddForm key={`contracts-view-${i}`} field={field} />)}
      </div>
    );
  }
}

export default ContractsView;
