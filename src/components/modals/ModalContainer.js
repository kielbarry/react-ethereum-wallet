import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// actions
// import * as Actions from '../../actions/actions';
import { displayGlobalNotification } from '../../actions/actions';
// Modals
// import NoConnection from './NoConnection';
import WatchContract from './WatchContract';
import WatchToken from './WatchToken';
import DeleteToken from './DeleteToken';
import SendTransaction from './SendTransaction';
import TransactionInfo from './TransactionInfo';
import QRCode from './QRCode';
import EventInfo from './EventInfo';
import JSONInterface from './JSONInterface';

export class ModalContainer extends Component {
  componentDidMount() {
    window.addEventListener('blur', e =>
      document.body.classList.add('app-blur')
    );
    window.addEventListener('focus', e =>
      document.body.classList.remove('app-blur')
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.globalNotification !== prevProps.globalNotification.display &&
      this.props.globalNotification.display === true
    ) {
      const notification = this.props.globalNotification;
      const toastConfig = {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      };
      switch (notification.type) {
        case 'error':
          toast.error(notification.msg, toastConfig);
          break;
        case 'warning':
          toast.warning(notification.msg, toastConfig);
          break;
        case 'success':
          toast.success(notification.msg, toastConfig);
          break;
        case 'info':
          toast.info(notification.msg, toastConfig);
          break;
        case 'default':
          toast(notification.msg, toastConfig);
          break;
        default:
          toast('a notification type was not set', toastConfig);
          break;
      }
      this.props.displayGlobalNotification({ display: false });
    }

    Object.values(this.props.modals).includes(true)
      ? document.body.classList.add('disable-scroll', 'blur', 'app-blur')
      : document.body.classList.remove('disable-scroll', 'blur', 'app-blur');
  }

  render() {
    const modals = this.props.modals;

    const watchContract = cn({
      'dapp-modal-overlay': modals.displayWatchContract || false,
    });
    const watchToken = cn({
      'dapp-modal-overlay': modals.displayWatchToken || false,
    });
    const deleteToken = cn({
      'dapp-modal-overlay': modals.displayDeleteToken || false,
    });

    const viewTransaction = cn({
      'dapp-modal-overlay': modals.displayTransaction || false,
    });

    const JsonInterface = cn({
      'dapp-modal-overlay': modals.displayJSONInterface || false,
    });
    const qrCode = cn({
      'dapp-modal-overlay': modals.displayQRCode || false,
    });

    const sendTransaction = cn({
      'dapp-modal-overlay': modals.displaySendTransaction || false,
    });

    const viewEventInfo = cn({
      'dapp-modal-overlay': modals.displayEventInfo || false,
    });

    const txToSend = this.props.TransactionToSend;

    return (
      <React.Fragment>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        {/* <NoConnection connection={this.props.web3} /> */}
        <WatchToken display={watchToken} />
        <WatchContract display={watchContract} />
        {this.props.TokenToDelete ? (
          <DeleteToken token={this.props.TokenToDelete} display={deleteToken} />
        ) : null}
        {this.props.SelectedTransaction ? (
          <TransactionInfo
            display={viewTransaction}
            transaction={this.props.SelectedTransaction}
          />
        ) : null}
        {this.props.SelectedEvent ? (
          <EventInfo display={viewEventInfo} event={this.props.SelectedEvent} />
        ) : null}
        {/* {Object.keys(txToSend).length && txToSend.constructor === Object ? ( */}
        {txToSend.value ? <SendTransaction display={sendTransaction} /> : null}
        {/* }
        {this.props.TransactionToSend ? (
          <SendTransaction display={sendTransaction} />
        ) : null}
      */}
        {this.props.qrCode ? (
          <QRCode hash={this.props.qrCode} display={qrCode} />
        ) : null}
        {this.props.JSONInterface ? (
          <JSONInterface
            JSONInterface={this.props.JSONInterface}
            display={JsonInterface}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => {
//   return state;
// };

const mapStateToProps = state => ({
  // return state;
  TransactionToSend: state.reducers.TransactionToSend,
  TokenToDelete: state.reducers.TokenToDelete,
  SelectedTransaction: state.reducers.SelectedTransaction,
  JSONInterface: state.reducers.JSONInterface,
  globalNotification: state.reducers.globalNotification,
  modals: state.reducers.modals,
});

export default connect(
  mapStateToProps,
  // { ...Actions }
  { displayGlobalNotification }
)(ModalContainer);
