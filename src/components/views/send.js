import React, { Component } from 'react';

import Slider from '../elements/Slider.jsx';
import TotalGas from '../elements/TotalGas.jsx';

import shortid from 'shortid';
// import ToggleButton from 'react-toggle-button';
// import "react-toggle/style.css";
// import makeBlockie from 'ethereum-blockies-base64';

//exp
import FormInput from '../elements/FormInput.jsx';
import LatestTransactions from '../elements/LatestTransactions.jsx';
import SecurityIcon from '../elements/SecurityIcon.jsx';
import { connect } from 'react-redux';
import * as Actions from '../../actions/actions.js';
import * as Utils from '../../utils/utils.js';

class SendContractForm extends Component {
  constructor(props) {
    super(props);
    let defaultWallet;
    let wallets = this.props.reducers.Wallets;
    for (var prop in wallets) {
      defaultWallet = prop;
      break;
    }
    this.props.updateTransactionToSend({
      name: 'from',
      value: defaultWallet,
    });
    this.state = {
      fromWallet: defaultWallet,
    };
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.selectWallet = this.selectWallet.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.sendTransaction = this.sendTransaction.bind(this);
  }

  handleOnKeyUp(e) {
    // TODO:validate inputs here
    this.props.updateTransactionToSend({
      name: e.target.getAttribute('name'),
      value: e.target.value,
    });
  }

  selectWallet(e) {
    this.setState({ fromWallet: e.target.value });
    // TODO:validate inputs here
    this.props.updateTransactionToSend({
      name: e.target.getAttribute('name'),
      value: e.target.value,
    });
  }

  toggleCheckbox(e) {
    this.props.updateTransactionToSend({
      name: 'amount',
      value: this.props.reducers.Wallets[this.state.fromWallet],
    });
  }

  sendTransaction(e) {
    let web3 = this.props.web3.web3Instance;
    let transaction = this.props.reducers.TransactionToSend;

    web3.eth
      .sendTransaction(transaction, (err, result) => {
        if (err) {
          this.displayGlobalNotification({
            display: true,
            msg: err,
            duration: 5,
          });
          console.warn(err);
        }
        if (result) {
          console.log(result);
        }
      })
      .on('transactionHash', function(hash) {
        console.log('transactionHash', hash);
      })
      .on('receipt', function(receipt) {
        console.log('receipt', receipt);
      })
      .on('confirmation', function(confirmationNumber, receipt) {
        console.log('confirmation confirmationNumber', confirmationNumber);
        console.log('confirmation receipt', receipt);
      })
      .on('error', console.error);
  }

  renderWalletDropDown() {
    let wallets = this.props.reducers.Wallets;
    return (
      <div className="col col-6 mobile-full from">
        <h3>From</h3>
        <div className="dapp-select-account send-from">
          <select
            className="send-from"
            name="from"
            onChange={this.selectWallet}
            value={this.state.fromWallet}
          >
            {Object.keys(wallets).map(w => {
              let balance = wallets[w];
              return (
                <React.Fragment>
                  <option value={w} key={shortid.generate()}>
                    {this.props.web3 && this.props.web3.web3Instance
                      ? Utils.displayPriceFormatter(this.props, balance)
                      : balance}
                    " - " + {w}
                  </option>
                  <SecurityIcon wallet={w} />
                </React.Fragment>
              );
            })}
          </select>
        </div>
      </div>
    );
  }

  render() {
    let wallets = this.props.reducers.Wallets;
    let txAmt = this.props.reducers.TransactionToSend.amount || 0;
    return (
      <form
        className="account-send-form"
        action="about:blank"
        target="dapp-form-helper-iframe"
        autoComplete="on"
      >
        <h1>
          <strong>Send</strong> Funds
        </h1>
        <div className="row clear from-to">
          {this.renderWalletDropDown()}

          <div className="col col-6 mobile-full">
            <h3>To</h3>
            <div className="dapp-address-input">
              <input
                type="text"
                name="to"
                placeholder="0x000000.."
                className="to"
                autoFocus={true}
                onKeyUp={e => this.handleOnKeyUp(e)}
              />
            </div>
          </div>
          <div className="dapp-clear-fix" />
        </div>
        <div className="row clear">
          <div className="col col-6 mobile-full amount">
            <h3>Amount</h3>
            <input
              type="text"
              min="0"
              step="any"
              name="value"
              placeholder="0.0"
              className="dapp-large"
              pattern="[0-9\.,]*"
              onKeyUp={e => this.handleOnKeyUp(e)}
              // value={txAmt}
            />
            <br />
            <label>
              <input
                type="checkbox"
                className="send-all"
                onChange={e => this.toggleCheckbox(e)}
              />
              Send everything
            </label>
            <p className="send-info">
              You want to send <strong>0 USD</strong> in Ether, using exchange
              rates from
              <a
                href="https://www.cryptocompare.com/coins/eth/overview/BTC"
                target="noopener noreferrer _blank"
              >
                {' '}
                cryptocompare.com
              </a>
              .<br />
              Which is currently an equivalent of <strong>0 ETHER</strong>.
            </p>
          </div>
          <div className="col col-6 mobile-full">
            <br />
            <br />
            <div className="token-ether">
              <span className="ether-symbol">Ξ</span>
              <span className="token-name">ETHER</span>
              <span className="balance">
                {this.props.web3 && this.props.web3.web3Instance
                  ? Utils.displayPriceFormatter(
                      this.props,
                      wallets[this.state.fromWallet]
                    ) +
                    ' ' +
                    this.props.reducers.currency +
                    ' (' +
                    Utils.displayPriceFormatter(
                      this.props,
                      wallets[this.state.fromWallet],
                      'ETHER'
                    ) +
                    'ETHER)'
                  : '5,538.38 USD (26.41223000001 ETHER)'}
              </span>
            </div>
          </div>
          <div className="dapp-clear-fix" />
        </div>

        {/*
        <ToggleButton
          inactiveLabel={''}
          activeLabel={''}
          colors={{
            activeThumb: {
              base: 'rgb(250,250,250)',
            },
            inactiveThumb: {
              base: 'rgb(62,130,247)',
            },
            active: {
              base: 'rgb(207,221,245)',
              hover: 'rgb(177, 191, 215)',
            },
            inactive: {
              base: 'rgb(65,66,68)',
              hover: 'rgb(95,96,98)',
            }
          }}
          // trackStyle={styles.trackStyle}
          // thumbStyle={styles.thumbStyle}
          thumbAnimateRange={[-10, 36]}
          // thumbIcon={<ThumbIcon/>}
          // value={self.state.value}
          onToggle={(value) => {
            console.log(value)
            // this.setState({
            //   value: !value,
            // })
          }} 
          // thumbStyle={styles.thumbStyle}
          // thumbStyleHover={styles.thumbStyleHover}
          animateThumbStyleHover={(n) => {
            return {
              boxShadow: `0 0 ${2 + 4*n}px rgba(0,0,0,.16),0 ${2 + 3*n}px ${4 + 8*n}px rgba(0,0,0,.32)`,
            }
          }}
        />
      */}

        <FormInput />
        <LatestTransactions />
        {/*<Slider /> */}
        {/*<TotalGas /> */}

        <button
          type="submit"
          className="dapp-block-button"
          onClick={e => this.sendTransaction(e)}
        >
          Send
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(SendContractForm);
