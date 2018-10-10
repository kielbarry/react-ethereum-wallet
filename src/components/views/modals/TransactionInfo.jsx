import React, { Component } from 'react';
import { connect } from 'react-redux';

// import InputItem from '../../elements/InputItem.jsx';
import * as Actions from '../../../actions/actions.js';
import onClickOutside from 'react-onclickoutside';
import SecurityIcon from '../../elements/SecurityIcon.jsx';

class TransactionInfo extends Component {
  handleClickOutside(evt) {
    if (!this.props.display) return;
    this.props.closeModal('displayTransaction');
  }

  render() {
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    let tx = this.props.transaction;
    return (
      <div className={this.props.display} style={divStyle}>
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
            {tx.dateSent}
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
                    <SecurityIcon
                      type="transactionHref"
                      classes="dapp-identicon dapp-tiny"
                      hash={tx.from}
                    />
                  </span>
                </td>
              </tr>
              <tr>
                <td>To</td>
                <td>
                  <span className="address dapp-shorten-text not-ens-name">
                    <SecurityIcon
                      type="transactionHref"
                      classes="dapp-identicon dapp-tiny"
                      hash={tx.to}
                    />
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
)(onClickOutside(TransactionInfo));
