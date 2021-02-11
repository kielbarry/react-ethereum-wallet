import React, { Component } from 'react';
import { connect } from 'react-redux';

// import * as Actions from '../actions/actions.js';
import { updateTransactionToSend } from '../actions/actions';
import { floatToTime } from '../utils/utils';
import web3 from '../web3';

export class GasFeeRow extends Component {
  constructor(props) {
    // TODO need to init gas
    // TODO where was estimate gas being called?!

    super(props);
    this.state = {
      standardFee: false,
    };
    this.changeGas = this.changeGas.bind(this);
    this.estimateGas = this.estimateGas.bind(this);
    this.toggleFee = this.toggleFee.bind(this);
  }

  changeGas(e) {
    this.props.updateTransactionToSend({
      name: 'gasPrice',
      value: e * 1000000000,
    });
  }

  estimateGas() {
    const tx = this.props.TransactionToSend;
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

  toggleFee(e) {
    this.setState({ standardFee: !this.state.standardFee });
    this.props.GasStats !== {} && !this.state.standardFee
      ? this.changeGas(this.props.GasStats.safeLow)
      : this.changeGas(this.props.GasStats.fastest);
  }

  renderFeePriority() {
    const GasStats = this.props.GasStats;
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
    const GasStats = this.props.GasStats;
    return (
      <div className="col col-5 mobile-full send-info">
        <br />
        <br />
        This is the most amount of money that might be used to process this
        transaction. Your transaction will be mined &nbsp;
        <strong>
          probably within &nbsp;
          {GasStats !== {} && this.state.standardFee
            ? floatToTime(GasStats.safeLowWait)
            : floatToTime(GasStats.fastWait)}
        </strong>
      </div>
    );
  }

  render() {
    return (
      <div className="row clear">
        {this.renderFeePriority()}
        {this.renderEstimateTime()}
        <div className="dapp-clear-fix" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  GasStats: state.reducers.GasStats,
  TransactionToSend: state.reducers.TransactionToSend,
});

export default connect(
  mapStateToProps,
  { updateTransactionToSend }
)(GasFeeRow);
