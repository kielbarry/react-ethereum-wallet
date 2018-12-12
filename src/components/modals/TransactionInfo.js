import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Utils from '../../utils/utils.js';
import * as Actions from '../../actions/actions.js';

import { EthAddress, Identicon } from 'ethereum-react-components';

import Web3 from 'web3';
let web3 = new Web3();

export const Header = props => {
  let nw = props.network;
  let hash = props.txHash;
  return (
    <h1>
      Transaction
      <a
        href={'http://' + nw + ' .etherscan.io/tx/' + hash}
        target="_blank"
        style={{ fontSize: '0.4em' }}
        rel="noopener noreferrer"
      >
        {hash}
      </a>
    </h1>
  );
};

export const DateRow = props => {
  let today = new Date();
  let txDate = new Date(props.tx.dateSent);
  var timeDiff = Math.abs(txDate.getTime() - today.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return (
    <p>
      {Utils.getMonthName(props.tx.dateSent)}
      {Utils.getDate(props.tx.dateSent)}
      <br />
      <small>{diffDays} day(s) ago</small>
    </p>
  );
};

export const Fee = props => {
  // TODO: from wei or from gWei
  let fee = web3.utils.fromWei(props.gasUsed.toString(), 'ETHER');
  return (
    <tr>
      <td>Fee paid</td>
      <td>{fee} &nbsp; ETHER</td>
    </tr>
  );
};

export const GasStat = props => {
  // TODO: from wei or from gWei
  let displayValue;
  if (props.title === 'Fee paid') {
    displayValue = web3.utils.fromWei(props.gasAmount.toString(), 'ETHER');
  } else if (props.title === 'Gas used') {
    displayValue = props.gasAmount;
  } else if (props.title === 'Gas price') {
    displayValue = props.gasAmount;
  }
  return (
    <tr>
      <td>{props.title}</td>
      <td>
        {displayValue} &nbsp; {props.text}
      </td>
    </tr>
  );
};

export const BlockInfo = props => {
  return (
    <tr>
      <td>Block</td>
      <td>
        {props.blockNumber}
        <br />
        <EthAddress short classes="" address={props.blockHash} />
      </td>
    </tr>
  );
};

export class TransactionInfo extends Component {
  constructor(props) {
    super(props);
    this.updateToTransaction = this.updateToTransaction.bind(this);
    this.handleRoute = this.handleRoute.bind(this);
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (
      this.props.transaction !== prevProps.transaction ||
      this.props.display !== prevProps.display
    ) {
      return true;
    }
    return false;
  }

  handleClickOutside(evt) {
    if (!this.props.display) return;
    this.props.closeModal('displayTransaction');
  }

  handleRoute(e) {
    this.updateToTransaction(e);
    this.closeModal(e);
  }

  closeModal(e) {
    e.preventDefault();
    if (e.target.getAttribute('id') === 'viewTransaction') {
      this.props.closeModal('displayTransaction');
    }
  }

  updateToTransaction(e) {
    e.stopPropagation();
    console.warn('todo: moved from security icon and need to pudate');
    // this.props.updateTransactionToSend({
    //   name: 'to',
    //   value: props.hash,
    // });
  }

  renderSentAmount() {
    let tx = this.props.transaction;
    let amount = web3.utils.fromWei(tx.value.toString(), 'ETHER');
    return (
      <tr>
        <td>Amount</td>
        <td>{amount} &nbsp; ETHER</td>
      </tr>
    );
  }

  renderAddress(tx, direction) {
    //TODO: conditional update transaction inside handleRoute
    return (
      <tr>
        <td>{direction}</td>
        <td>
          <span className="address dapp-shorten-text not-ens-name">
            <Identicon
              classes="dapp-identicon dapp-tiny"
              title
              size="tiny"
              address={tx[direction.toLowerCase()]}
            />
            <Link
              to={{ pathname: '/send-from/' + tx[direction.toLowerCase()] }}
              title={tx[direction.toLowerCase()]}
              onClick={this.handleRoute}
            >
              {tx[direction.toLowerCase()]}
            </Link>
          </span>
        </td>
      </tr>
    );
  }

  render() {
    //TODO: gas paid versus fee

    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    let tx = this.props.transaction;
    console.log(this.props);
    console.log(this.props.transaction);

    return (
      <div
        className={this.props.display}
        style={divStyle}
        onClick={e => this.closeModal(e)}
        id="viewTransaction"
      >
        <section className="dapp-modal-container transaction-info">
          <Header
            network={this.props.reducers.network}
            txHash={tx.transactionHash}
          />
          <DateRow tx={tx} />
          <table className="dapp-zebra">
            <tbody>
              {this.renderSentAmount()}
              {this.renderAddress(tx, 'From')}
              {this.renderAddress(tx, 'To')}
              <GasStat title="Fee paid" text="ETHER" gasAmount={tx.gasUsed} />
              <GasStat title="Gas used" text="" gasAmount={tx.gasUsed} />
              <GasStat
                title="Gas price"
                text="ETHER PER MILLION GAS"
                gasAmount={tx.gasPrice}
              />
              <BlockInfo
                blockNumber={tx.blockNumber}
                blockHash={tx.blockHash}
              />
            </tbody>
          </table>
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
)(TransactionInfo);
