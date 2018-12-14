import React, { Component } from 'react';
import { connect } from 'react-redux';
import { displayPriceFormatter } from '../utils/utils.js';
import Web3 from 'web3';

const TokenInfo = props => {
  let tx = props.transaction;
  return (
    <React.Fragment>
      <span className="amount">
        &nbsp;
        {tx.tokenAmount}
      </span>
      &nbsp;
      {tx.tokenToSend.symbol}
    </React.Fragment>
  );
};

export class TotalGas extends Component {
  render() {
    let tx = this.props.TransactionToSend;
    let val = Number(tx.value);
    let total = !tx.sendToken ? val + tx.gasPrice : tx.gasPrice;
    total = !isNaN(total) ? total : 0;
    let web3 = new Web3();
    total = web3.utils.toBN(total);
    return (
      <div className="row clear total">
        <div className="col col-12 mobile-full">
          <h3>total</h3>
          {!tx.sendToken ? (
            <span className="amount">
              {' ' +
                displayPriceFormatter(this.props, total) +
                ' ' +
                this.props.reducers.currency}
            </span>
          ) : (
            <TokenInfo transaction={tx} />
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
