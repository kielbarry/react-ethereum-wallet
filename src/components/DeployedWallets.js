import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContractItem from './elements/ContractItem.js';
import ButtonDescription from './ButtonDescription.js';
import { Link } from 'react-router-dom';

const buttonTitle = 'Wallet Contracts';
const buttonDescription =
  'These contracts are stored on the blockchain and can hold and secure Ether. They can have multiple accounts as owners and keep a full log of all transactions.';

// snapshooted
const WalletLink = () => {
  return (
    <React.Fragment>
      <Link
        to={{ pathname: '/wallet/new' }}
        className="wallet-box create add-contract"
      >
        <div className="account-pattern">+</div>
        <h3>ADD WALLET CONTRACT</h3>
      </Link>
      <div className="dapp-clear-fix" />
    </React.Fragment>
  );
};

export class DeployedWallets extends Component {
  renderWalletBoxList() {
    const icon = 'icon-eye';
    let {
      ContractsPendingConfirmations,
      WalletContracts,
    } = this.props.reducers;
    let contracts = Object.assign(
      {},
      ContractsPendingConfirmations,
      WalletContracts
    );
    return (
      <React.Fragment>
        <div className="wallet-box-list">
          {Object.keys(contracts).map((address, i) => (
            <ContractItem
              key={address}
              number={i + 1}
              icon={icon}
              pending={
                Object.keys(contracts[address]).length === 0 &&
                contracts[address].constructor === Object
                  ? true
                  : false
              }
              contract={contracts[address]}
              address={address}
              wallet={contracts[address].length === 0 ? contracts[address] : ''}
              props={this.props}
              addressType="WalletContracts"
            />
          ))}
        </div>
        <div className="dapp-clear-fix" />
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <ButtonDescription
          title={buttonTitle}
          description={buttonDescription}
        />
        {this.renderWalletBoxList()}
        <WalletLink />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(DeployedWallets);
