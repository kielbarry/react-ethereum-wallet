import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddForm from '../AddForm.jsx';
import PageHeader from '../elements/PageHeaders.jsx';
import { AccountPageHeader } from '../../constants/FieldConstants.jsx';
import AccountItem from '../elements/AccountItem.jsx';

const listItems = [
 {
    title: 'Accounts',
    redirect: true,
    link: '',
    buttonClass: 'wallet-box create',
    buttonDescription: 'ADD ACCOUNT',
    contractDescription: "Accounts are password protected keys that can hold Ether and Ethereum-based tokens. They can control contracts, but can't display incoming transactions.",
  },
  {
    title: 'Wallet Contracts',
    redirect: false,
    link: 'account/new',
    buttonClass: 'wallet-box create add-contract',
    buttonDescription: 'ADD WALLET CONTRACT',
    contractDescription: 'These contracts are stored on the blockchain and can hold and secure Ether. They can have multiple accounts as owners and keep a full log of all transactions.',
  }
]

class AccountView extends Component {


  constructor(props){
    super(props)
  }

  renderAccounts() {
    if(this.props.reducers.Wallets != undefined) {

      const wallets = this.props.reducers.Wallets

      // Object.keys(wallets).map(address => {
      //   console.log(wallets[address])
      // });

      return (
        <React.Fragment>
          { 
            Object.keys(wallets).map((address, i) => 
              (
                <AccountItem 
                key={address} 
                number={i+1} 
                address={address} 
                wallet={wallets[address]}
                />
              ) 
            )
          }
        </React.Fragment>
      )
    }
  }


  render() {
    return (
      <div className="dapp-container account-page">

        <PageHeader title={AccountPageHeader} />

        { this.renderAccounts() }


        {listItems.map((field, i) => <AddForm key={`account-view-${i}`} field={field} />)}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(AccountView);
