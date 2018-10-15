import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import SecurityIcon from '../../elements/SecurityIcon.js';

// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement')

class ReactModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    let tx = this.props.transaction;
    return (
      <div className={this.props.display} style={divStyle}>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          // className={this.props.display}
          // style={divStyle}
          // style={customStyles}
          contentLabel="Example Modal"
          // className="dapp-modal-container transaction-info"
        >
          <div>hello world</div>
          {/*
          <h1>
            Transaction
            <a
              // href={
              //   'http://' +
              //   this.props.reducers.network +
              //   ' .etherscan.io/tx/' +
              //   tx.transactionHash
              // }
              href=''
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
        */}
        </Modal>
      </div>
    );
  }
}

export default ReactModal;
