import React, { Component } from 'react';
import shortid from 'shortid';

import SecurityIcon from '../elements/SecurityIcon.js';
import { connect } from 'react-redux';
import * as Actions from '../../actions/actions.js';
import * as Utils from '../../utils/utils.js';

import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';

const styles = {};

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
    this.selectWallet = this.selectWallet.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.changeGas = this.changeGas.bind(this);
    this.estimateGas = this.estimateGas.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
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

  selectWallet(e) {
    this.setState({ fromWallet: e.target.value });
    // TODO:validate inputs here
    this.props.updateTransactionToSend({
      name: e.target.getAttribute('name'),
      value: e.target.value,
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

  renderWalletDropDown() {
    let wallets = this.props.reducers.Wallets;
    return (
      <div className="col col-6 mobile-full from">
        <h3>From</h3>
        <div className="dapp-select-account send-from">
          <select
            className="send-from"
            name="from"
            onChange={this.selectWallet}
            value={this.state.fromWallet}
          >
            {Object.keys(wallets).map(w => {
              let balance = wallets[w];
              return (
                <React.Fragment>
                  <option key={shortid.generate()} value={w}>
                    {this.props.web3 && this.props.web3.web3Instance
                      ? Utils.displayPriceFormatter(this.props, balance)
                      : balance}
                    " - " + {w}
                  </option>
                </React.Fragment>
              );
            })}
          </select>
          <SecurityIcon
            type="address"
            classes="dapp-identicon dapp-small"
            hash={this.state.fromWallet}
          />
        </div>
      </div>
    );
  }

  handleSwitch = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  toggleFee(e) {
    console.log(e);
    this.setState({ standardFee: !this.state.standardFee });
    this.props.reducers.GasStats !== {} && this.state.standardFee
      ? this.changeGas(this.props.reducers.GasStats.safeLow)
      : this.changeGas(this.props.reducers.GasStats.fastest);
  }

  renderFromToRow() {
    return (
      <div className="row clear from-to">
        {this.renderWalletDropDown()}
        <div className="col col-6 mobile-full">
          <h3>To</h3>
          <div className="dapp-address-input">
            <input
              type="text"
              name="to"
              placeholder="0x000000.."
              className="to"
              autoFocus={true}
              onKeyUp={e => this.handleOnKeyUp(e)}
            />
          </div>
        </div>
        <div className="dapp-clear-fix" />
      </div>
    );
  }

  renderAmountRow() {
    let wallets = this.props.reducers.Wallets;
    let { Wallets, currency } = this.props.reducers;
    return (
      <div className="row clear">
        <div className="col col-6 mobile-full amount">
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
        </div>
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
                    wallets[this.state.fromWallet]
                  ) +
                  ' ' +
                  this.props.reducers.currency +
                  ' (' +
                  Utils.displayPriceFormatter(
                    this.props,
                    wallets[this.state.fromWallet],
                    'ETHER'
                  ) +
                  'ETHER)'
                : '5,538.38 USD (26.41223000001 ETHER)'}
            </span>
          </div>
        </div>
        <div className="dapp-clear-fix" />
      </div>
    );
  }

  renderFeeRow() {
    let GasStats = this.props.reducers.GasStats;
    return (
      <div className="row clear">
        <div className="col col-7 mobile-full">
          <h3>Select Fee</h3>
          <div
            className="dapp-select-gas-price"
            onClick={e => this.toggleFee(e)}
          >
            {GasStats !== {} && this.state.standardFee ? (
              <span>STANDARD FEE: &nbsp; {GasStats.safeLow} </span>
            ) : (
              <span>PRIORITY FEE: &nbsp; {GasStats.fastest}</span>
            )}
          </div>
        </div>
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
        <div className="dapp-clear-fix" />
      </div>
    );
  }

  renderTotalRow() {
    return (
      <div className="row clear total">
        <div className="col col-12 mobile-full">
          <h3>total</h3>
          <span className="amount">
            {this.props.web3 && this.props.web3.web3Instance
              ? ' ' +
                Utils.displayPriceFormatter(
                  this.props,
                  this.props.reducers.TransactionToSend.value +
                    this.props.reducers.TransactionToSend.gasPrice
                ) +
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

  render() {
    let wallets = this.props.reducers.Wallets;
    // let txAmt = this.props.reducers.TransactionToSend.amount || 0;
    const { classes } = this.props;
    return (
      <form
        className="account-send-form"
        action="about:blank"
        target="dapp-form-helper-iframe"
        autoComplete="on"
      >
        <h1>
          <strong>Send</strong> Funds
        </h1>
        {this.renderFromToRow()}
        {this.renderAmountRow()}
        {this.renderFeeRow()}
        {this.renderTotalRow()}
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
