import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';

import WalletDropdown from '../components/elements/WalletDropdown.js';

import RadioTokenSelect from '../components/elements/RadioTokenSelect.js';

import AmountRow from '../components/AmountRow.js';
import GasFeeRow from '../components/GasFeeRow.js';
import TotalGas from '../components/TotalGas.js';

import * as Actions from '../actions/actions.js';
import * as Utils from '../utils/utils.js';

const styles = {};

const Title = () => {
  return (
    <h1>
      <strong>Send</strong> Funds
    </h1>
  );
};

export class Send extends Component {
  //TODO replace fromWallet with the from field from reducer TransactionToSend

  constructor(props) {
    super(props);
    let defaultWallet;
    let wallets = this.props.reducers.Wallets;
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
    // this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm(tx) {
    let msg;
    let valid = true;
    let web3 = this.props.web3.web3Instance;
    let totalBalance = this.props.reducers.totalBalance;
    if (!web3.utils.isAddress(tx.to)) {
      msg =
        'The To field has an invalid address! Please check that it has been entered correctly';
      valid = false;
      this.props.displayGlobalNotification({
        display: true,
        type: 'error',
        msg: msg,
      });
    }
    if (!web3.utils.isAddress(tx.from)) {
      msg =
        'The From field has an invalid address! Please check that it has been entered correctly';
      valid = false;
      this.props.displayGlobalNotification({
        display: true,
        type: 'error',
        msg: msg,
      });
    }
    if (!tx.value) {
      msg = "Oops! You'll need  to specify an amount to send";
      valid = false;
      this.props.displayGlobalNotification({
        display: true,
        type: 'info',
        msg: msg,
      });
    }
    if (tx.amount > totalBalance) {
      msg =
        "Oops! That's more than the wallet holds. Please select a lesser amount";
      valid = false;
      this.props.displayGlobalNotification({
        display: true,
        type: 'warning',
        msg: msg,
      });
    }
    if (valid) this.props.displayModal('displaySendTransaction');
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

  renderFromToRow() {
    let tx = this.props.reducers.TransactionToSend;
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

  renderSubmitButton() {
    return (
      <button
        type="submit"
        className="dapp-block-button"
        onClick={e => {
          e.preventDefault();
          this.validateForm(this.props.reducers.TransactionToSend);
        }}
      >
        Send
      </button>
    );
  }

  render() {
    return (
      <form
        className="account-send-form"
        action="about:blank"
        target="dapp-form-helper-iframe"
        autoComplete="on"
      >
        <Title />
        {this.renderFromToRow()}
        <AmountRow />
        <GasFeeRow />
        <TotalGas />
        {this.renderSubmitButton()}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default compose(
  withStyles(styles, { name: 'Send' }),
  connect(
    mapStateToProps,
    { ...Actions }
  )
)(Send);
