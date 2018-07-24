import React, { Component } from 'react';
// import TokenBox from '../elements/tokenbox.js';

import AddForm from '../AddForm.jsx';

import Modal from './modals/WatchItem.jsx';

import PageHeader from '../elements/PageHeaders.jsx';
import { ContractPageHeader } from '../../constants/FieldConstants.jsx';


const listItems = [
  {
    title: '',
    redirect: true,
    link: 'deploy-contract',
    buttonClass: 'wallet-box create add-contract',
    buttonDescription: 'DEPLOY NEW CONTRACT',
    contractDescription: ''
  },
  {
    title: 'Custom Contracts',
    redirect: false,
    link: 'deploy-contract',
    buttonClass: 'wallet-box create add-contract',
    buttonDescription: 'WATCH CONTRACT',
    contractDescription:
      'To watch and interact with a contract already deployed on the blockchain, you need to know its address and the description of its interface in JSON format.'
  },
  {
    title: 'Custom Tokens',
    redirect: false,
    link: 'deploy-contract',
    buttonClass: 'wallet-box create add-token',
    buttonDescription: 'DEPLOY NEW CONTRACT',
    contractDescription:
      'Tokens are currencies and other fungibles built on the Ethereum platform. In order for accounts to watch for tokens and send them, you have to add their address to this list. You can create your own token by simply modifying this example of a custom token contract or learning more about Ethereum Tokens.'
  }
];


class ContractsView extends Component {
  render() {
    return (
      <div className="dapp-container">
        
        <PageHeader title={ContractPageHeader} />


        {listItems.map((field, i) => <AddForm key={`contracts-view-${i}`} field={field} />)}
      </div>
    );
  }
}

export default ContractsView;
