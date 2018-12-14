import React, { Component } from 'react';
import { connect } from 'react-redux';
import Web3 from 'web3';
import RadioTokenSelect from './elements/RadioTokenSelect';
import { updateTransactionToSend } from '../actions/actions';
import { displayPriceFormatter } from '../utils/utils';

export class AmountRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: false,
    };
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  handleOnKeyUp(e) {
    // TODO:validate inputs here
    // let web3 = this.props.web3.web3Instance;
    const tx = this.props.TransactionToSend;
    let target = e.target.getAttribute('name');
    let targetValue = e.target.value;

    // TODO: still not to validate, but allow single decimal
    if (targetValue.includes('.')) {
      const web3 = new Web3();
      const eth = targetValue.split('.')[0];

      const wei = web3.utils.toWei(eth, 'ether');
      const subEth = targetValue.split('.')[1];
    }

    if (target === 'value' && this.props.web3 && targetValue && !tx.sendToken) {
      const web3 = this.props.web3.web3Instance;
      targetValue = web3.utils.toWei(targetValue, 'ETHER');
    }

    if (tx.sendToken) {
      target = 'tokenAmount';
    }

    this.props.updateTransactionToSend({
      name: target,
      value: targetValue,
    });
  }

  toggleCheckbox(e) {
    const wallet = this.props.TransactionToSend;
    this.props.updateTransactionToSend({
      name: 'value',
      value: this.state.checkbox ? this.props.Wallets[wallet.from] : 0,
    });
    this.setState({ checkbox: !this.state.checkbox });
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
    const tx = this.props.TransactionToSend;
    const currency = this.props.reducers.currency;
    return (
      <p className="send-info">
        You want to send
        <strong>
          {!tx.sendToken ? (
            ` ${displayPriceFormatter(this.props, tx.value)} ${currency}`
          ) : (
            <React.Fragment>
              &nbsp; {tx.tokenAmount}
              &nbsp; {tx.tokenToSend.symbol}
            </React.Fragment>
          )}
        </strong>
        .
      </p>
    );
  }

  renderEtherBalance() {
    const wallets = this.props.Wallets;
    const wallet = this.props.TransactionToSend.from;
    const currency = this.props.reducers.currency;
    const balance = wallets[wallet].balance;
    return (
      <div className="token-ether">
        <span className="ether-symbol">Ξ</span>
        <span className="token-name">ETHER</span>
        <span className="balance">
          {` ${displayPriceFormatter(
            this.props,
            balance
          )} ${currency} (${displayPriceFormatter(
            this.props,
            balance,
            'ETHER'
          )}ETHER)`}
        </span>
      </div>
    );
  }

  renderEtherDropDown() {
    const wallets = this.props.Wallets;
    const wallet = this.props.TransactionToSend.from;
    const tokens = wallets[wallet] ? wallets[wallet].tokens : undefined;
    return (
      <div className="col col-6 mobile-full">
        <br />
        <br />
        {tokens ? (
          <RadioTokenSelect wallet={wallet} tokens={tokens} />
        ) : (
          this.renderEtherBalance()
        )}
      </div>
    );
  }

  render() {
    return (
      <div className="row clear">
        <div className="col col-6 mobile-full amount">
          {this.renderAmount()}
          {this.renderAmountSummary()}
        </div>
        {this.renderEtherDropDown()}
        <div className="dapp-clear-fix" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Wallets: state.reducers.Wallets,
  GasStats: state.reducers.GasStats,
  TransactionToSend: state.reducers.TransactionToSend,
  web3: state.web3,
  reducers: {
    exchangeRates: state.reducers.exchangeRates,
    currency: state.reducers.currency,
  },
});

export default connect(
  mapStateToProps,
  { updateTransactionToSend }
)(AmountRow);
