import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// actions
// import * as Actions from '../../actions/actions.js';
import { displayGlobalNotification } from '../../actions/actions.js';
// Modals
// import NoConnection from './NoConnection.js';
import WatchContract from './WatchContract.js';
import WatchToken from './WatchToken.js';
import DeleteToken from './DeleteToken.js';
import SendTransaction from './SendTransaction.js';
import TransactionInfo from './TransactionInfo.js';
import QRCode from './QRCode.js';
import EventInfo from './EventInfo.js';
import JSONInterface from './JSONInterface.js';

export class ModalContainer extends Component {
  constructor(props) {
    super(props);
  }

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
      let notification = this.props.globalNotification;
      let toastConfig = {
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
    let modals = this.props.modals;

    let watchContract = cn({
      'dapp-modal-overlay': modals.displayWatchContract || false,
    });
    let watchToken = cn({
      'dapp-modal-overlay': modals.displayWatchToken || false,
    });
    let deleteToken = cn({
      'dapp-modal-overlay': modals.displayDeleteToken || false,
    });

    let viewTransaction = cn({
      'dapp-modal-overlay': modals.displayTransaction || false,
    });

    let JsonInterface = cn({
      'dapp-modal-overlay': modals.displayJSONInterface || false,
    });
    let qrCode = cn({
      'dapp-modal-overlay': modals.displayQRCode || false,
    });

    let sendTransaction = cn({
      'dapp-modal-overlay': modals.displaySendTransaction || false,
    });

    let viewEventInfo = cn({
      'dapp-modal-overlay': modals.displayEventInfo || false,
    });

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
        {/*<NoConnection connection={this.props.web3} />*/}
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
        {this.props.TransactionToSend ? (
          <SendTransaction display={sendTransaction} />
        ) : null}
        {/*}
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
