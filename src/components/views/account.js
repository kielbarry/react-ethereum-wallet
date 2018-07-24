import React, { Component } from 'react';
import AddForm from '../AddForm.jsx';

const listItems = [
  {
    title: 'Accounts',
    redirect: false,
    buttonClass: 'wallet-box create add-account',
    buttonDescription: 'ADD ACCOUNT',
    contractDescription:
      "Accounts are password protected keys that can hold Ether and Ethereum-based tokens. They can control contracts, but can't display incoming transactions."
  },
  {
    title: 'Wallet Contracts',
    redirect: true,
    link: 'account/new',
    buttonClass: 'wallet-box create ',
    buttonDescription: 'ADD WALLET CONTRACt',
    contractDescription:
      'These contracts are stored on the blockchain and can hold and secure Ether. They can have multiple accounts as owners and keep a full log of all transactions.'
  }
];

class AccountView extends Component {
  render() {
    return (
      <div className="dapp-container accounts-page">
        <h1>
          <strong>Accounts</strong> Overview
        </h1>

        {listItems.map(field => <AddForm field={field} />)}
        {/* <div class="dapp-sticky-bar dapp-container">
                    <h1 class="{{ensClass}}">
                        <span>{{displayName}}</span>
                            <button class="dapp-icon-button delete icon-trash"></button>
                    </h1>
	            </div>
		        */}
      </div>
    );
  }
}

export default AccountView;
