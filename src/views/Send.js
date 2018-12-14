import React, { Component } from 'react';
import { connect } from 'react-redux';

import FromToRow from '../components/FromToRow';
import AmountRow from '../components/AmountRow';
import GasFeeRow from '../components/GasFeeRow';
import TotalGas from '../components/TotalGas';

import {
  updateTransactionToSend,
  displayGlobalNotification,
  displayModal,
} from '../actions/actions';

const Title = () => {
  return (
    <h1>
      <strong>Send</strong> Funds
    </h1>
  );
};

export class Send extends Component {
  // TODO replace fromWallet with the from field from reducer TransactionToSend

  constructor(props) {
    super(props);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validateSendingEther = this.validateSendingEther.bind(this);
    this.validateSendingTokens = this.validateSendingTokens.bind(this);
  }

  validateSendingEther(tx) {
    console.log('in validateSendingEther');
    let msg;
    let valid = true;
    const totalBalance = this.props.reducers.totalBalance;
    if (!tx.value) {
      msg = "Oops! You'll need  to specify an amount to send";
      valid = false;
      this.props.displayGlobalNotification({
        display: true,
        type: 'info',
        msg,
      });
    }
    if (tx.amount > totalBalance) {
      msg =
        "Oops! That's more than the wallet holds. Please select a lesser amount";
      valid = false;
      this.props.displayGlobalNotification({
        display: true,
        type: 'warning',
        msg,
      });
    }
    if (valid) this.props.displayModal('displaySendTransaction');
  }

  validateSendingTokens(tx) {
    console.log('in validateSendingTokens');
    const valid = true;
    const web3 = this.props.web3.web3Instance;
    if (valid) this.props.displayModal('displaySendTransaction');
  }

  validateForm(tx) {
    let msg;
    let valid = true;
    const web3 = this.props.web3.web3Instance;

    if (!web3.utils.isAddress(tx.to)) {
      msg =
        'The To field has an invalid address! Please check that it has been entered correctly';
      valid = false;
      this.props.displayGlobalNotification({
        display: true,
        type: 'error',
        msg,
      });
    }
    if (!web3.utils.isAddress(tx.from)) {
      msg =
        'The From field has an invalid address! Please check that it has been entered correctly';
      valid = false;
      this.props.displayGlobalNotification({
        display: true,
        type: 'error',
        msg,
      });
    }

    !tx.sendToken
      ? this.validateSendingEther(tx)
      : this.validateSendingTokens(tx);

    // if (valid) this.props.displayModal('displaySendTransaction');
  }

  handleOnKeyUp(e) {
    // TODO:validate inputs here
    // let web3 = this.props.web3.web3Instance;
    const target = e.target.getAttribute('name');
    let targetValue = e.target.value;

    if (target === 'value' && this.props.web3 && targetValue) {
      const web3 = this.props.web3.web3Instance;
      targetValue = web3.utils.toWei(targetValue, 'ETHER');
    }
    this.props.updateTransactionToSend({
      name: target,
      value: targetValue,
    });
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
        <FromToRow />
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

export default connect(
  mapStateToProps,
  { updateTransactionToSend, displayGlobalNotification, displayModal }
)(Send);
