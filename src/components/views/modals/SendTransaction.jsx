import React, { Component } from 'react';
import { connect } from 'react-redux';

// import InputItem from '../../elements/InputItem.jsx';
import TestInputItem from '../../elements/TestInputItem.jsx';
import SecurityIcon from '../../elements/SecurityIcon.jsx';
import * as Actions from '../../../actions/actions.js';

class SendTransactionModal extends Component {
  constructor(props) {
    super(props);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.cancelFunction = this.cancelFunction.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
    this.sendTransaction = this.sendTransaction.bind(this);
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (this.props.display !== prevProps.display) {
      return true;
    }
    return false;
  }

  handleOnKeyUp(e) {
    // TODO:validate inputs here
    // this.props.updateContractToWatch({
    //   name: e.target.getAttribute('name'),
    //   value: e.target.value,
    // });
  }

  cancelFunction(e) {
    // this.props.cancelContractToWatch(); //
    this.props.closeModal('displaySendTransaction');
  }

  sendTransaction(e) {
    //TODO: TODO:reset data values in inputs
    e.preventDefault();
    let web3 = this.props.web3.web3Instance;
    let tx = this.props.reducers.TransactionToSend;
    let obj = { from: tx.from, to: tx.to, amount: tx.value };
    let date = new Date();

    web3.eth
      .sendTransaction({ from: tx.from, to: tx.to, amount: tx.value })
      .on('transactionHash', hash => {
        this.props.addTransaction({
          hash: hash,
          value: { ...tx, dateSent: date },
        });
      })
      .on('receipt', receipt => {
        this.props.updateTransaction({
          name: [receipt.transactionHash],
          value: receipt,
        });
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        this.props.updateTransactionConfirmation({
          name: [receipt.transactionHash],
          value: confirmationNumber,
        });
      })
      .on('error', err => {
        this.props.displayGlobalNotification({
          display: true,
          type: 'error',
          msg: err,
          duration: 5,
        });
        console.warn(err);
      });
  }

  submitFunction(e) {
    let web3;
    // let transaction = this.props.reducers.TransactionToSend;

    this.sendTransaction(e);
    this.props.closeModal('displaySendTransaction');
  }

  // {this.props.web3 && this.props.web3.web3Instance
  //               ? Utils.displayPriceFormatter(this.props, transaction.value, "ETHER")
  //               : transaction.value
  //           }

  render() {
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    let transaction = this.props.reducers.TransactionToSend;
    return (
      <div className={this.props.display} style={divStyle}>
        <section className="dapp-modal-container send-transaction-info">
          <h1>
            Send
            <br />
            ETHER
          </h1>
          <p>
            <SecurityIcon wallet="123fdsf" />
            {transaction.from}
          </p>
          <i className="icon-arrow-down" />
          <p>
            <SecurityIcon wallet="Asdgafb43" />
            {transaction.to}
          </p>
          <hr />
          <p className="tx-info">
            <small>"+ Estimated fee"</small>
            {transaction.estimatedGas} Wei
            <br />
            <small className="gas-price">
              Gas price {transaction.gasPrice} gWei
              <br />
              Estimated required gas {transaction.estimatedGas}
            </small>
          </p>
          <div className="dapp-modal-buttons">
            <button className="cancel" onClick={() => this.cancelFunction()}>
              Cancel
            </button>
            <button
              className="ok dapp-primary-button"
              onClick={e => this.submitFunction(e)}
            >
              OK
            </button>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => {
  // return {modals: state.modals}
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(SendTransactionModal);
