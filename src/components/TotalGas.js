import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Utils from '../utils/utils.js';

export class TotalGas extends Component {
  render() {
    let val = this.props.TransactionToSend.value;
    let gas = this.props.TransactionToSend.gasPrice;
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
