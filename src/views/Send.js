import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import shortid from 'shortid';

import { withStyles } from '@material-ui/core/styles';

import SecurityIcon from '../components/elements/SecurityIcon.js';
import WalletDropdown from '../components/elements/WalletDropdown.js';

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

class SendContractForm extends Component {
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
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.changeGas = this.changeGas.bind(this);
    this.estimateGas = this.estimateGas.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.toggleFee = this.toggleFee.bind(this);
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

  changeGas(e) {
    this.props.updateTransactionToSend({
      name: 'gasPrice',
      value: e * 1000000000,
    });
  }

  estimateGas() {
    let web3 = this.props.web3.web3Instance;
    let tx = this.props.reducers.TransactionToSend;
    web3.eth.estimateGas(
      {
        to: tx.to,
        from: tx.from,
        amount: tx.value,
      },
      (err, res) => {
        err
          ? console.warn(err)
          : this.props.updateTransactionToSend({
              name: 'estimatedGas',
              value: res,
            });
      }
    );
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

  toggleCheckbox(e) {
    this.props.updateTransactionToSend({
      name: 'value',
      value: this.state.checkbox
        ? this.props.reducers.Wallets[this.state.fromWallet]
        : 0,
    });
    this.setState({ checkbox: !this.state.checkbox });
  }

  toggleFee(e) {
    this.setState({ standardFee: !this.state.standardFee });
    this.props.reducers.GasStats !== {} && this.state.standardFee
      ? this.changeGas(this.props.reducers.GasStats.safeLow)
      : this.changeGas(this.props.reducers.GasStats.fastest);
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

  renderAmount() {
    return (
      <React.Fragment>
        <h3>Amount</h3>
        <input
          type="text"
          min="0"
          step="any"
          name="value"
          placeholder="0.0"
          className="dapp-large"
          pattern="[0-9\.,]*"
          // value={this.props.reducers.TransactionToSend.value || 0}
          onKeyUp={e => this.handleOnKeyUp(e)}
        />
        <br />
        <label>
          <input
            type="checkbox"
            className="send-all"
            onChange={e => this.toggleCheckbox(e)}
          />
          Send everything
        </label>
      </React.Fragment>
    );
  }

  renderAmountSummary() {
    return (
      <p className="send-info">
        You want to send
        <strong>
          {this.props.web3 && this.props.web3.web3Instance
            ? ' ' +
              Utils.displayPriceFormatter(
                this.props,
                this.props.reducers.TransactionToSend.value
              ) +
              ' ' +
              this.props.reducers.currency
            : 0 + ' ' + this.props.reducers.currency}
        </strong>{' '}
        in Ether, using exchange rates from
        <a
          href="https://www.cryptocompare.com/coins/eth/overview/BTC"
          target="noopener noreferrer _blank"
        >
          {' '}
          cryptocompare.com
        </a>
        .<br />
        Which is currently an equivalent of
        <strong>
          {this.props.web3 && this.props.web3.web3Instance
            ? ' ' +
              Utils.displayPriceFormatter(
                this.props,
                this.props.reducers.TransactionToSend.value,
                'ETHER'
              ) +
              ' ETHER'
            : 0 + ' ETHER'}
        </strong>
        .
      </p>
    );
  }

  renderEtherValue() {
    let wallets = this.props.reducers.Wallets;
    return (
      <div className="col col-6 mobile-full">
        <br />
        <br />
        <div className="token-ether">
          <span className="ether-symbol">Ξ</span>
          <span className="token-name">ETHER</span>
          <span className="balance">
            {this.props.web3 && this.props.web3.web3Instance
              ? ' ' +
                Utils.displayPriceFormatter(
                  this.props,
                  wallets[this.state.fromWallet].balance
                ) +
                ' ' +
                this.props.reducers.currency +
                ' (' +
                Utils.displayPriceFormatter(
                  this.props,
                  wallets[this.state.fromWallet].balance,
                  'ETHER'
                ) +
                'ETHER)'
              : '5,538.38 USD (26.41223000001 ETHER)'}
          </span>
        </div>
      </div>
    );
  }

  renderAmountRow() {
    return (
      <div className="row clear">
        <div className="col col-6 mobile-full amount">
          {this.renderAmount()}
          {this.renderAmountSummary()}
        </div>
        {this.renderEtherValue()}
        <div className="dapp-clear-fix" />
      </div>
    );
  }

  renderFeePriority() {
    let GasStats = this.props.reducers.GasStats;
    return (
      <div className="col col-7 mobile-full">
        <h3>Select Fee</h3>
        <div className="dapp-select-gas-price" onClick={e => this.toggleFee(e)}>
          {GasStats !== {} && this.state.standardFee ? (
            <span>STANDARD FEE: &nbsp; {GasStats.safeLow} </span>
          ) : (
            <span>PRIORITY FEE: &nbsp; {GasStats.fastest}</span>
          )}
        </div>
      </div>
    );
  }

  renderEstimateTime() {
    let GasStats = this.props.reducers.GasStats;
    return (
      <div className="col col-5 mobile-full send-info">
        <br />
        <br />
        This is the most amount of money that might be used to process this
        transaction. Your transaction will be mined &nbsp;
        <strong>
          probably within &nbsp;
          {GasStats !== {} && this.state.standardFee
            ? Utils.floatToTime(GasStats.safeLowWait)
            : Utils.floatToTime(GasStats.fastWait)}
        </strong>
      </div>
    );
  }

  renderFeeRow() {
    return (
      <div className="row clear">
        {this.renderFeePriority()}
        {this.renderEstimateTime()}
        <div className="dapp-clear-fix" />
      </div>
    );
  }

  renderTotalRow() {
    let val = this.props.reducers.TransactionToSend.value;
    let gas = this.props.reducers.TransactionToSend.gasPrice;
    return (
      <div className="row clear total">
        <div className="col col-12 mobile-full">
          <h3>total</h3>
          <span className="amount">
            {this.props.web3 && this.props.web3.web3Instance
              ? ' ' +
                Utils.displayPriceFormatter(this.props, val + gas) +
                ' ' +
                this.props.reducers.currency
              : 0 + ' ' + this.props.reducers.currency}
          </span>
          <br />
          Gas is paid by the owner of the wallet contract (0.000044187 ETHER)
        </div>
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
          this.estimateGas();
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
        {this.renderAmountRow()}
        {this.renderFeeRow()}
        {this.renderTotalRow()}
        {this.renderSubmitButton()}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default compose(
  withStyles(styles, { name: 'SendContractForm' }),
  connect(
    mapStateToProps,
    { ...Actions }
  )
)(SendContractForm);
