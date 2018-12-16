import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router';

import { Identicon } from 'ethereum-react-components';
import SecurityIcon from '../elements/SecurityIcon';
import * as Actions from '../../actions/actions';

import { combineWallets, sortByBalance } from '../../utils/helperFunctions';

import { tokenInterface } from '../../constants/TokenInterfaceConstant';
import web3 from '../../web3';
import ethUtils from 'ethereumjs-util';

const BigNumber = ethUtils.BN;

export const Title = props => {
  let value;
  if (props.tx.value)
    value = web3.utils.fromWei(new BigNumber(props.tx.value), 'ETHER');
  return (
    <h1>
      Send
      <br />
      {value} ETHER
    </h1>
  );
};

export const TransactionName = info => {
  return (
    <p>
      <span className="address dapp-shorten-text not-ens-name">
        <Identicon
          classes="dapp-identicon dapp-small"
          title
          size="small"
          address={info.from}
        />
        {info.from}
      </span>
    </p>
  );
};

export const GasInfo = info => {
  return (
    <React.Fragment>
      <small>+ Estimated fee</small>
      {info.estimatedGas} Wei
      <br />
      <small className="gas-price">
        Gas price {info.gasPrice} gWei
        <br />
        Estimated required gas {info.estimatedGas}
        <br />
      </small>
    </React.Fragment>
  );
};

export class SendTransactionModal extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   userEnteredGas: '',
    // };

    this.cancelFunction = this.cancelFunction.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
    this.sendTransaction = this.sendTransaction.bind(this);
    this.sendEtherTransaction = this.sendEtherTransaction.bind(this);
    this.sendTokenTransaction = this.sendTokenTransaction.bind(this);
    this.updateTokenBalances = this.updateTokenBalances.bind(this);
    this.returnAccountName = this.returnAccountName.bind(this);
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (this.props.display !== prevProps.display) {
      console.log('this.props.display', this.props.display);
      console.log('prevProps.display', prevProps.display);
      return true;
    }
    if (this.props.reducers.TransactionToSend !== prevProps.TransactionToSend) {
      // console.log(
      //   'this.props.reducers.TransactionToSend',
      //   this.props.reducers.TransactionToSend
      // );
      // console.log(
      //   'prevProps.reducers.TransactionToSend',
      //   prevProps.reducers.TransactionToSend
      // );
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
    const tx = this.props.reducers.TransactionToSend;

    const date = new Date();

    const BN = web3.utils.BN;
    const amount = new BN(tx.value);
    // let gasPrice = new BN(tx.gasPrice.toString());
    const gasPrice = tx.gasPrice;
    const maxGas = new BN('21000');

    const { Wallets, WalletContracts } = this.props.reducers;
    console.log(Wallets);
    console.log(WalletContracts);
    const combinedWallets = Object.keys(
      combineWallets(Wallets, WalletContracts)
    ).map(address => address);

    console.log(combinedWallets);

    let transactionType;
    if (combinedWallets.includes(tx.to) && combinedWallets.includes(tx.from)) {
      transactionType = 'Transfer between accounts';
    }

    web3.eth
      .sendTransaction({
        from: tx.from,
        to: tx.to,
        value: amount,
        gasPrice,
      })
      .on('transactionHash', transactionHash => {
        this.props.addTransaction({
          hash: transactionHash,
          value: {
            ...tx,
            dateSent: date,
            confirmationNumber: 'Pending',
            transactionHash,
            transactionType,
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
      .on('receipt', receipt => {})
      .on('confirmation', (confirmationNumber, receipt) => {
        const cn = confirmationNumber;
        let msg;
        if (cn === 0 || cn === 12) {
          cn === 0
            ? (msg =
                'Success! Your transaction has been confirmed. Please allow for 12 confirmations')
            : (msg = 'Your transaction has been confirmed 12 times!');
          this.props.displayGlobalNotification({
            display: true,
            type: 'success',
            msg,
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

    // TODO: need to use data field with the following?
    // 0xa9059cbb00000000000000000000000065b42142606a9d46d05ea5205ad4b610a9130e92000000000000000000000000000000000000000000000001158e460913d00000

    const addresses = this.props.reducers.Wallets;
    const walletContracts = this.props.reducers.walletContracts;
    const wallets = Object.keys(Object.assign({}, addresses, walletContracts));

    // TokenContract.methods['balanceOf'](tx.to)
    // TokenContract.methods['balanceOf'](tx.from)
  }

  sendTokenTransaction(e) {
    const tx = this.props.reducers.TransactionToSend;
    const token = tx.tokenToSend;

    const TokenContract = new web3.eth.Contract(tokenInterface, {
      from: tx.from,
    });

    TokenContract.options.address = token.address;

    const transactionType = 'Token sent';

    // TODO: update balances on successful send

    try {
      // TODO need this?

      // .encodeABI();

      TokenContract.methods
        .transfer(tx.to, tx.tokenAmount)
        .call()
        .then(res => {
          // yup returns nothing

          console.log('Res', res);

          // TODO: add to transaction list
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
    // TODO: reset data values in inputs
    e.preventDefault();
    // let date = new Date();
    const tx = this.props.reducers.TransactionToSend;
    !tx.sendToken ? this.sendEtherTransaction(e) : this.sendTokenTransaction(e);
    // console.log(tx);
  }

  submitFunction(e) {
    this.sendTransaction(e);
    this.props.closeModal('displaySendTransaction');
  }

  returnAccountName(address) {
    // let transaction = this.props.reducers.TransactionToSend;
    const wallets = this.props.reducers.Wallets;
    const walletArray = Object.keys(wallets).map(key => key);
    const walletContracts = this.props.reducers.WalletContracts;
    const walletContractArray = Object.keys(walletContracts).map(key => key);
    const observedContracts = this.props.reducers.ObservedContracts;
    const observedContractsArray = Object.keys(observedContracts).map(
      key => key
    );
    const observedTokens = this.props.reducers.ObservedTokens;
    const observedTokensArray = Object.keys(observedTokens).map(key => key);
    let name;
    if (walletArray.includes(address)) {
      name = wallets[address].name;
      // name || `Account ${wallets[address].number}`;
      return name;
    }
    if (walletContractArray.includes(address)) {
      return walletContracts[address]['contract-name'];
    }
    if (observedContractsArray.includes(address)) {
      return observedContracts[address]['contract-name'];
    }
    if (observedTokensArray.includes(address)) {
      return observedTokens[address].name;
    }
    return name;
  }

  render() {
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    const transaction = this.props.reducers.TransactionToSend;
    const fromName = this.returnAccountName(transaction.from);
    const toName = this.returnAccountName(transaction.to);

    return (
      <div className={this.props.display} style={divStyle}>
        <section className="dapp-modal-container send-transaction-info">
          <Title tx={transaction} />
          {/* <TransactionName info={transaction} /> */}
          <p>
            <span className="address dapp-shorten-text not-ens-name">
              {/*
              <SecurityIcon
                type="accountRoute"
                classes={'dapp-identicon dapp-tiny'}
                hash={transaction.from || ''}
              />
              */}
              <Identicon
                classes="dapp-identicon dapp-tiny"
                title
                size="tiny"
                address={transaction.from}
              />
              {/* {transaction.from} */}
              {fromName || transaction.from}
            </span>
          </p>
          <i className="icon-arrow-down" />
          {/* <TransactionName info={transaction} /> */}
          <p>
            <span className="address dapp-shorten-text not-ens-name">
              {/* }
              <SecurityIcon
                type="transactionHref"
                classes={'dapp-identicon dapp-tiny'}
                hash={transaction.to || ''}
              />
              */}
              <Identicon
                classes="dapp-identicon dapp-tiny"
                title
                size="tiny"
                address={transaction.to}
              />
              {toName || transaction.to}
            </span>
          </p>
          <hr />
          <p className="tx-info">
            <small>+ Estimated fee</small>
            {transaction.estimatedGas} Wei
            <br />
            <small className="gas-price">
              Gas price {transaction.gasPrice} gWei
              <br />
              Estimated required gas {transaction.estimatedGas}
              <br />
            </small>
            {/* <GasInfo/> */}
            <small>
              Provide gas:
              <input type="number" min="21000" className="gas dapp-tiny" />
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
