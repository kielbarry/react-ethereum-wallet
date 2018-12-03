import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Utils from '../../utils/utils.js';
import * as Actions from '../../actions/actions.js';

import { Identicon } from 'ethereum-react-components';

export class TransactionInfo extends Component {
  constructor(props) {
    super(props);
    this.updateToTransaction = this.updateToTransaction.bind(this);
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

  render() {
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
          <h1>
            Transaction
            <a
              href={
                'http://' +
                this.props.reducers.network +
                ' .etherscan.io/tx/' +
                tx.transactionHash
              }
              target="_blank"
              style={{ fontSize: '0.4em' }}
              rel="noopener noreferrer"
            />
          </h1>
          <p>
            {Utils.getMonthName(tx.dateSent)}
            {Utils.getDate(tx.dateSent)}
            <br />
            <small>
              (a day ago, <strong>6,511</strong> Confirmations)
            </small>
          </p>
          <table className="dapp-zebra">
            <tbody>
              <tr>
                <td>Amount</td>
                <td>{tx.value}</td>
              </tr>
              <tr>
                <td>From</td>
                <td>
                  <span className="address dapp-shorten-text not-ens-name">
                    <Identicon
                      classes="dapp-identicon dapp-tiny"
                      title
                      size="tiny"
                      seed={tx.from}
                    />
                    <Link
                      to={{ pathname: '/send-from/' + tx.from }}
                      title={tx.from}
                      onClick={e => this.updateToTransaction(e)}
                    >
                      {tx.from}
                    </Link>
                  </span>
                </td>
              </tr>
              <tr>
                <td>To</td>
                <td>
                  <span className="address dapp-shorten-text not-ens-name">
                    <Identicon
                      classes="dapp-identicon dapp-tiny"
                      title
                      size="tiny"
                      seed={tx.to}
                    />
                    <Link
                      to={{ pathname: '/send-from/' + tx.to }}
                      title={tx.to}
                      onClick={e => this.updateToTransaction(e)}
                    >
                      {tx.to}
                    </Link>
                  </span>
                </td>
              </tr>
              <tr>
                <td>Fee paid</td>
                <td>{tx.gasUsed}</td>
              </tr>
              <tr>
                <td>Gas used</td>
                <td>{tx.gasUsed}</td>
              </tr>
              <tr>
                <td>Gas price</td>
                <td>{tx.gasPrice}</td>
              </tr>
              <tr>
                <td>Block</td>
                <td>
                  {tx.blockNumber}
                  <br />
                  {tx.blockHash}
                </td>
              </tr>
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
