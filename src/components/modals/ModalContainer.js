import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// actions
import * as Actions from '../../actions/actions.js';

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

class App extends Component {
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
      this.props.reducers.globalNotification !==
        prevProps.reducers.globalNotification.display &&
      this.props.reducers.globalNotification.display === true
    ) {
      let notification = this.props.reducers.globalNotification;
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

    Object.values(this.props.reducers.modals).includes(true)
      ? document.body.classList.add('disable-scroll', 'blur', 'app-blur')
      : document.body.classList.remove('disable-scroll', 'blur', 'app-blur');
  }

  render() {
    let modals = this.props.reducers.modals;
    let watchContract = cn({
      'dapp-modal-overlay': modals.displayWatchContract || false,
    });
    let watchToken = cn({
      'dapp-modal-overlay': modals.displayWatchToken || false,
    });
    let deleteToken = cn({
      'dapp-modal-overlay': modals.displayDeleteToken || false,
    });
    // let sendTransaction = cn({
    //   'dapp-modal-overlay': modals.displaySendTransaction || false,
    // });
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

    // let qrHash = this.props.reducers.SelectedWallet ? this.props.reducers.SelectedWallet.adress : ''
    // let qrHash = this.props.reducers.SelectedTransaction ? this.props.reducers.SelectedTransaction.adress : ''

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
        {/*}

        <DeleteToken
          token={this.props.reducers.TokenToDelete}
          display={deleteToken}
        />

        {this.props.reducers.SelectedTransaction ? (
          <TransactionInfo
            display={viewTransaction}
            transaction={this.props.reducers.SelectedTransaction}
          />
        ) : null}
        {/*}
        <EventInfo
          display={viewEventInfo}
          event={this.props.reducers.SelectedEvent}
        />
      */}
        <WatchToken display={watchToken} />
        <WatchContract display={watchContract} />
        <SendTransaction display={sendTransaction} />
        <QRCode hash={this.props.reducers.qrCode} display={qrCode} />
        <JSONInterface
          JSONInterface={this.props.reducers.JSONInterface}
          display={JsonInterface}
        />
        */}
        {/*<NoConnection connection={this.props.web3} />*/}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(App);
