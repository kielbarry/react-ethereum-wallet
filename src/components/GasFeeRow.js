import React, { Component } from 'react';
import { connect } from 'react-redux';

// import * as Actions from '../actions/actions.js';
import { updateTransactionToSend } from '../actions/actions.js';
import { floatToTime } from '../utils/utils.js';

class GasFeeRow extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    // this.state = this.props
    this.state = {
      standardFee: false,
      // GasStats: this.props.reducers.GasStats,
      // TransactionToSend: this.props.reducers.TransactionToSend,
    };

    console.log(this.props);
    console.log(this.state);

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
    let web3 = this.props.web3.web3Instance;
    let tx = this.props.TransactionToSend;
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
    console.log('standardFee props', this.props.standardFee);
    console.log('!standardFee props', !this.props.standardFee);
    console.log('!standardFee state', this.state.standardFee);
    console.log('!standardFee state', !this.state.standardFee);
    this.setState({ standardFee: !this.state.standardFee });
    this.props.GasStats !== {} && this.state.standardFee
      ? this.changeGas(this.props.GasStats.safeLow)
      : this.changeGas(this.props.GasStats.fastest);
  }

  renderFeePriority() {
    let GasStats = this.props.GasStats;
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
    let GasStats = this.props.GasStats;
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
    console.log(this.props);
    console.log(this.state);
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
  // return state;
  // standardFee: state.standardFee,
  GasStats: state.reducers.GasStats,
  TransactionToSend: state.reducers.TransactionToSend,
  web3: state.web3,
});

// const mapStateToProps = state => ({
//   // ...state,
//   // GasStats: state.GasStats,
//   // TransactionToSend: state.TransactionToSend
// });

export default connect(
  mapStateToProps,
  { updateTransactionToSend }
)(GasFeeRow);
