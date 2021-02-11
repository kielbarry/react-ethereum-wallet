import React, { Component } from 'react';
import { connect } from 'react-redux';
import Web3 from 'web3';
import { displayPriceFormatter } from '../utils/utils';
import ethUtils from 'ethereumjs-util';

const BigNumber = ethUtils.BN;

const web3 = new Web3();

const TokenInfo = ({ tx }) => {
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
  renderTotal(total) {
    const tx = this.props.TransactionToSend;
    return (
      <React.Fragment>
        <h3>Total</h3>
        {!tx.sendToken ? (
          <span className="amount">
            {` ${displayPriceFormatter(this.props, total)} ${
              this.props.reducers.currency
            }`}
          </span>
        ) : (
          <TokenInfo transaction={tx} />
        )}
      </React.Fragment>
    );
  }

  render() {
    const tx = this.props.TransactionToSend;
    const val = Number(tx.value);
    let total = !tx.sendToken ? val + tx.gasPrice : tx.gasPrice;
    total = !isNaN(total) ? total : 0;
    total = web3.utils.toBN(total);
    return (
      <div className="row clear total">
        <div className="col col-12 mobile-full">
          {this.renderTotal(total)}
          <br />
          Estimated Fee: &nbsp;
          {web3.utils.fromWei(new BigNumber(total) || '0', 'ether')}
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
