import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import WalletDropdown from '../components/elements/WalletDropdown.js';
import { updateTransactionToSend } from '../actions/actions.js';
import * as Utils from '../utils/utils.js';

export class Send extends Component {
  //TODO replace fromWallet with the from field from reducer TransactionToSend
  constructor(props) {
    super(props);
    let defaultWallet;
    let wallets = this.props.Wallets;
    for (var prop in wallets) {
      defaultWallet = prop;
      break;
    }
    this.props.updateTransactionToSend({
      name: 'from',
      value: defaultWallet,
    });
    this.state = {
      fromWallet: defaultWallet,
      switchChecked: true,
      checkbox: false,
      standardFee: false,
    };

    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
  }
  handleOnKeyUp(e) {
    // TODO:validate inputs here
    // let web3 = this.props.web3.web3Instance;
    let target = e.target.getAttribute('name');
    let targetValue = e.target.value;

    if (target === 'value' && this.props.web3 && targetValue) {
      let web3 = this.props.web3.web3Instance;
      targetValue = web3.utils.toWei(targetValue, 'ETHER');
    }
    this.props.updateTransactionToSend({
      name: target,
      value: targetValue,
    });
  }

  renderFrom() {
    let dropdownConfig = {
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

  renderTo() {
    return (
      <div className="col col-6 mobile-full">
        <h3>To</h3>
        <div className="dapp-address-input">
          <input
            type="text"
            name="to"
            placeholder="0x000000.."
            className="to"
            autoFocus={true}
            // value={tx.to}
            onKeyUp={e => this.handleOnKeyUp(e)}
          />
        </div>
      </div>
    );
  }

  render() {
    let dropdownConfig = {
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
});

export default connect(
  mapStateToProps,
  { updateTransactionToSend }
)(Send);
