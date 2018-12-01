import React, { Component } from 'react';
import { connect } from 'react-redux';

// import InputItem from '../elements/InputItem.js';
// import TestInputItem from '../elements/TestInputItem.js';
import SecurityIcon from '../elements/SecurityIcon.js';
import * as Actions from '../../actions/actions.js';

import { Identicon } from 'ethereum-react-components';

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
    this.props.updateTransactionToSend({
      name: e.target.getAttribute('name'),
      value: e.target.value,
    });
  }

  cancelFunction(e) {
    this.props.closeModal('displaySendTransaction');
  }

  sendTransaction(e) {
    //TODO: reset data values in inputs
    e.preventDefault();
    let web3 = this.props.web3.web3Instance;
    let tx = this.props.reducers.TransactionToSend;
    let date = new Date();

    console.log(tx);

    web3.eth
      .sendTransaction({
        from: tx.from,
        to: tx.to,
        amount: tx.value,
        gasPrice: tx.gasPrice,
      })
      .on('transactionHash', hash => {
        this.props.addTransaction({
          hash: hash,
          value: { ...tx, dateSent: date, confirmationNumber: 'Pending' },
        });
        this.props.displayGlobalNotification({
          display: true,
          type: 'warning',
          msg: 'Your transaction has been submitted and is currently pending',
        });
        this.props.clearTransactionToSend();
      })
      .on('receipt', receipt => {
        console.log('the receipt', receipt);
        this.props.updateTransaction({
          name: [receipt.transactionHash],
          value: receipt,
        });
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        let cn = confirmationNumber;
        console.log('the cn', cn);
        this.props.updateTransactionConfirmation({
          name: [receipt.transactionHash],
          value: cn,
        });

        let msg;
        if (cn === 0 || cn === 12) {
          cn === 0
            ? (msg =
                'Success! Your transaction has been confirmed. Please allow for 12 confirmations')
            : (msg = 'Your transaction has been confirmed 12 times!');
          this.props.displayGlobalNotification({
            display: true,
            type: 'success',
            msg: msg,
          });
        }
      })
      .on('error', err => {
        this.props.displayGlobalNotification({
          display: true,
          type: 'error',
          msg: err.Error,
          duration: 5,
        });
        console.warn(err);
      });
  }

  submitFunction(e) {
    this.sendTransaction(e);
    this.props.closeModal('displaySendTransaction');
  }

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
            <Identicon size="small" address={transaction.from} />
            {transaction.from}
          </p>
          <i className="icon-arrow-down" />
          <p>
            <Identicon size="small" address={transaction.to} />
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
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(SendTransactionModal);
