import React, { Component } from 'react';
import { connect } from 'react-redux';
import RadioTokenSelect from './elements/RadioTokenSelect.js';
import { updateTransactionToSend } from '../actions/actions.js';
import { displayPriceFormatter } from '../utils/utils.js';
import Web3 from 'web3';

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
    let tx = this.props.TransactionToSend;
    let target = e.target.getAttribute('name');
    let targetValue = e.target.value;

    //TODO: still not to validate, but allow single decimal
    if (targetValue.includes('.')) {
      console.log('in includes decimal');
      let web3 = new Web3();
      let eth = targetValue.split('.')[0];

      let wei = web3.utils.toWei(eth, 'ether');
      let subEth = targetValue.split('.')[1];
    }

    if (target === 'value' && this.props.web3 && targetValue && !tx.sendToken) {
      let web3 = this.props.web3.web3Instance;
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
    let wallet = this.props.TransactionToSend;
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
    let tx = this.props.TransactionToSend;
    return (
      <p className="send-info">
        You want to send
        {!tx.sendToken ? (
          <strong>
            {this.props.web3 && this.props.web3.web3Instance
              ? ' ' +
                displayPriceFormatter(this.props, tx.value) +
                ' ' +
                this.props.reducers.currency
              : 0 + ' ' + this.props.reducers.currency}
          </strong>
        ) : (
          <strong>
            &nbsp;
            {tx.tokenAmount}
            &nbsp;
            {tx.tokenToSend.symbol}
          </strong>
        )}
        {/*
          {' '}
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
      */}
        .
      </p>
    );
  }

  renderEtherValue() {
    let wallets = this.props.Wallets;
    // let wallet = this.state.fromWallet
    let wallet = this.props.TransactionToSend.from;

    let tokens = wallets[wallet] ? wallets[wallet].tokens : undefined;

    if (!tokens) {
      //TODO: this is getting updated infinitely and kills app
      // this.props.updateTokenToSend({
      //   sendToken: false,
      //   tokenToSend: {},
      // });
    }

    return (
      <div className="col col-6 mobile-full">
        <br />
        <br />
        {tokens ? (
          <RadioTokenSelect wallet={wallet} tokens={tokens} />
        ) : (
          <div className="token-ether">
            <span className="ether-symbol">Ξ</span>
            <span className="token-name">ETHER</span>
            <span className="balance">
              {this.props.web3 && this.props.web3.web3Instance
                ? ' ' +
                  displayPriceFormatter(
                    this.props,
                    // wallets[this.state.fromWallet].balance
                    wallets[wallet].balance
                  ) +
                  ' ' +
                  this.props.reducers.currency +
                  ' (' +
                  displayPriceFormatter(
                    this.props,
                    // wallets[this.state.fromWallet].balance,
                    wallets[wallet].balance,
                    'ETHER'
                  ) +
                  'ETHER)'
                : '5,538.38 USD (26.41223000001 ETHER)'}
            </span>
          </div>
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
        {this.renderEtherValue()}
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
