import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router';

// import InputItem from '../elements/InputItem.js';
// import TestInputItem from '../elements/TestInputItem.js';
import * as Actions from '../../actions/actions.js';

//List of actions actually used
// closeModal
// addTransaction
// displayGlobalNotification
// clearTransactionToSend
// updateTransaction
// updateTransactionConfirmation

import { tokenInterface } from '../../constants/TokenInterfaceConstant.js';
import { Identicon } from 'ethereum-react-components';

export class SendTransactionModal extends Component {
  constructor(props) {
    super(props);
    this.cancelFunction = this.cancelFunction.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
    this.sendTransaction = this.sendTransaction.bind(this);
    this.sendEtherTransaction = this.sendEtherTransaction.bind(this);
    this.sendTokenTransaction = this.sendTokenTransaction.bind(this);
    this.updateTokenBalances = this.updateTokenBalances.bind(this);
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (this.props.display !== prevProps.display) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    console.log('in will unmount');
    this.props.clearTransactionToSend();
  }

  cancelFunction(e) {
    this.props.closeModal('displaySendTransaction');
  }

  sendEtherTransaction(e) {
    let web3 = this.props.web3.web3Instance;
    let tx = this.props.reducers.TransactionToSend;
    let date = new Date();
    web3.eth
      .sendTransaction({
        from: tx.from,
        to: tx.to,
        amount: tx.value,
        gasPrice: tx.gasPrice,
      })
      .on('transactionHash', transactionHash => {
        this.props.addTransaction({
          hash: transactionHash,
          value: {
            ...tx,
            dateSent: date,
            confirmationNumber: 'Pending',
            transactionHash: transactionHash,
          },
        });
        this.props.displayGlobalNotification({
          display: true,
          type: 'warning',
          msg: 'Your transaction has been submitted and is currently pending',
        });
        // this.props.clearTransactionToSend();
        this.props.history.push('/accounts');
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
          msg: err.message,
          duration: 5,
        });
        console.warn(err);
      });
  }

  updateTokenBalances(TokenContract) {
    console.log('yes inside updateTokenBalances');

    // Or should I just subscribe to Transfer Event?!

    //TODO: need to use data field with the following?
    // 0xa9059cbb00000000000000000000000065b42142606a9d46d05ea5205ad4b610a9130e92000000000000000000000000000000000000000000000001158e460913d00000

    let addresses = this.props.reducers.Wallets;
    let walletContracts = this.props.reducers.walletContracts;
    let wallets = Object.keys(Object.assign({}, addresses, walletContracts));

    // TokenContract.methods['balanceOf'](tx.to)
    // TokenContract.methods['balanceOf'](tx.from)
  }

  sendTokenTransaction(e) {
    let tx = this.props.reducers.TransactionToSend;
    let token = tx.tokenToSend;

    let web3 = this.props.web3.web3Instance;
    let TokenContract = new web3.eth.Contract(tokenInterface, {
      from: tx.from,
    });

    TokenContract.options.address = token.address;

    // TODO: update balances on successful send

    try {
      //TODO need this?

      //.encodeABI();

      TokenContract.methods['transfer'](tx.to, tx.tokenAmount)
        .call()
        .then(res => {
          // yup returns nothing

          console.log('Res', res);

          //TODO: add to transaction list
          // name the category is {token name} - Token transfer

          this.updateTokenBalances(TokenContract);
          this.props.history.push('/accounts');
        });
    } catch (err) {
      console.warn(err);
      this.props.displayGlobalNotification({
        display: true,
        type: 'error',
        msg: 'There was an error processing your token transaction',
      });
    }
  }

  sendTransaction(e) {
    //TODO: reset data values in inputs
    e.preventDefault();
    // let web3 = this.props.web3.web3Instance;
    // let date = new Date();
    let tx = this.props.reducers.TransactionToSend;
    !tx.sendToken ? this.sendEtherTransaction(e) : this.sendTokenTransaction(e);
    // console.log(tx);
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
            <Identicon
              classes="dapp-identicon dapp-small"
              title
              size="small"
              seed={transaction.from}
            />
            {transaction.from}
          </p>
          <i className="icon-arrow-down" />
          <p>
            <Identicon
              classes="dapp-identicon dapp-small"
              title
              size="small"
              seed={transaction.to}
            />
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
)(withRouter(SendTransactionModal));
