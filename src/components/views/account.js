import React, { Component } from 'react';
import AddForm from '../AddForm.jsx';

import PageHeader from '../elements/PageHeaders.jsx';

import { AccountPageHeader, DefaultAccountList } from '../../constants/FieldConstants.jsx';

import AccountItem from '../elements/AccountItem.jsx';

const listItems = [
 {
    title: 'Accounts',
    redirect: false,
    link: '',
    buttonClass: 'wallet-box create',
    buttonDescription: 'ADD ACCOUNT',
    contractDescription: "Accounts are password protected keys that can hold Ether and Ethereum-based tokens. They can control contracts, but can't display incoming transactions.",
  },
  {
    title: 'Wallet Contracts',
    redirect: true,
    link: 'account/new',
    buttonClass: 'wallet-box create add-contract',
    buttonDescription: 'ADD WALLET CONTRACT',
    contractDescription: 'These contracts are stored on the blockchain and can hold and secure Ether. They can have multiple accounts as owners and keep a full log of all transactions.',
  }
]

class AccountView extends Component {
  render() {
    return (
      <div className="dapp-container account-page">

        <PageHeader title={AccountPageHeader} />

        <AccountItem />

        {listItems.map((field, i) => <AddForm key={`account-view-${i}`} field={field} />)}
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
