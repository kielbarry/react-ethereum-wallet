import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Identicon } from 'ethereum-react-components';
import Web3 from 'web3';
import WalletDropdown from './elements/WalletDropdown';
import { updateTransactionToSend } from '../actions/actions';

import * as Utils from '../utils/utils';

import { combineWallets, sortByBalance } from '../utils/helperFunctions';

const web3 = new Web3();

export class Send extends Component {
  // TODO replace fromWallet with the from field from reducer TransactionToSend
  constructor(props) {
    super(props);
    const wallets = this.props.Wallets;

    const { Wallets, WalletContracts } = this.props;
    console.log(Wallets);
    console.log(WalletContracts);

    const combinedWallets = combineWallets(Wallets, WalletContracts);

    this.props.updateTransactionToSend({
      name: 'from',
      value: combinedWallets[0].address,
    });
    this.state = {
      fromWallet: combinedWallets[0].address,
      switchChecked: true,
      checkbox: false,
      standardFee: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkIsAddress = this.checkIsAddress.bind(this);
  }

  handleInputChange(e) {
    // TODO:validate inputs here
    const target = e.target.getAttribute('name');
    let targetValue = e.target.value;

    if (target === 'value' && targetValue) {
      targetValue = web3.utils.toWei(targetValue, 'ETHER');
    }

    this.setState({ toAddress: targetValue });

    this.checkIsAddress();

    this.props.updateTransactionToSend({
      name: target,
      value: targetValue,
    });
  }

  checkIsAddress() {
    const isAddress =
      this.state.toAddress !== '' && this.state.toAddress !== undefined
        ? web3.utils.isAddress(this.state.toAddress)
        : this.state.toAddress !== '' || this.state.toAddress !== undefined
        ? null
        : false;
    this.setState({ toIsAddress: isAddress });
  }

  renderFrom() {
    const dropdownConfig = {
      component: 'Send',
      selectClassName: 'send-from',
      selectName: 'from',
    };
    return (
      <div className="col col-6 mobile-full from">
        <h3>From</h3>
        <div className="dapp-select-account send-from">
          <WalletDropdown dropdownConfig={dropdownConfig} />
        </div>
      </div>
    );
  }

  renderIcon() {
    return (
      <React.Fragment>
        {this.state.toIsAddress &&
        typeof this.state.toIsAddress === typeof true ? (
          <Identicon
            classes="dapp-identicon dapp-tiny"
            title
            size="tiny"
            address={this.state.toAddress}
          />
        ) : this.state.toIsAddress === null ||
          this.state.toIsAddress === undefined ? null : (
          <i className="icon-shield" />
        )}
      </React.Fragment>
    );
  }

  renderTo() {
    const cn = require('classnames');
    const newClasses = cn({
      to: true,
      'dapp-error': this.state.toIsAddress === false,
    });
    return (
      <div className="col col-6 mobile-full">
        <h3>To</h3>
        <div className="dapp-address-input">
          <input
            type="text"
            name="to"
            placeholder="0x000000.."
            className={newClasses}
            autoFocus
            // value={tx.to}
            onChange={e => this.handleInputChange(e)}
            onKeyUp={e => this.handleInputChange(e)}
          />
          {this.renderIcon()}
        </div>
      </div>
    );
  }

  render() {
    const dropdownConfig = {
      component: 'Send',
      selectClassName: 'send-from',
      selectName: 'from',
    };
    return (
      <div className="row clear from-to">
        {this.renderFrom()}
        {this.renderTo()}
        <div className="dapp-clear-fix" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  TransactionToSend: state.reducers.TransactionToSend,
  Wallets: state.reducers.Wallets,
  WalletContracts: state.reducers.WalletContracts,
});

export default connect(
  mapStateToProps,
  { updateTransactionToSend }
)(Send);
