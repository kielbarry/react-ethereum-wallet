import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Utils from '../utils/utils.js';
import Web3 from 'web3';

export class TotalGas extends Component {
  render() {
    let tx = this.props.TransactionToSend;
    let val = Number(tx.value);
    let gas = tx.gasPrice;

    let total = !tx.sendToken ? val + gas : gas;

    let web3 = new Web3();
    total = web3.utils.toBN(total);
    return (
      <div className="row clear total">
        <div className="col col-12 mobile-full">
          <h3>total</h3>
          {!tx.sendToken ? (
            // will exist if provider connected, will be removing
            <span className="amount">
              {this.props.web3 && this.props.web3.web3Instance
                ? ' ' +
                  Utils.displayPriceFormatter(this.props, total) +
                  ' ' +
                  this.props.reducers.currency
                : 0 + ' ' + this.props.reducers.currency}
            </span>
          ) : (
            <React.Fragment>
              <span className="amount">
                &nbsp;
                {tx.tokenAmount}
              </span>
              &nbsp;
              {tx.tokenToSend.symbol}
            </React.Fragment>
          )}
          <br />
          Estimated Fee: &nbsp;
          {web3.utils.fromWei(total, 'ether')}
          &nbsp; ETHER
        </div>
        <div className="dapp-clear-fix" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  TransactionToSend: state.reducers.TransactionToSend,
  web3: state.web3,
  reducers: {
    exchangeRates: state.reducers.exchangeRates,
    currency: state.reducers.currency,
  },
});

export default connect(
  mapStateToProps,
  null
)(TotalGas);
