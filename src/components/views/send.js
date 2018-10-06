import React, { Component } from 'react';

// import Slider from '../elements/Slider.jsx';
// import TotalGas from '../elements/TotalGas.jsx';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
// import Range from 'rc-slider/lib/Range';
// import Tooltip from 'rc-tooltip';

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
    this.changeGas = this.changeGas.bind(this);
    this.estimateGas = this.estimateGas.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm(tx) {
    let msg;
    let valid = true;
    let web3 = this.props.web3.web3Instance;
    let totalBalance = this.props.reducers.totalBalance;
    if (!web3.utils.isAddress(tx.to)) {
      msg =
        'The To field has an invalid address! Please check that it has been entered correctly';
      valid = false;
      this.props.displayGlobalNotification({
        display: true,
        type: 'error',
        msg: msg,
      });
    }
    if (!web3.utils.isAddress(tx.from)) {
      msg =
        'The From field has an invalid address! Please check that it has been entered correctly';
      valid = false;
      this.props.displayGlobalNotification({
        display: true,
        type: 'error',
        msg: msg,
      });
    }
    if (!tx.value) {
      msg = "Oops! You'll need  to specify an amount to send";
      valid = false;
      this.props.displayGlobalNotification({
        display: true,
        type: 'info',
        msg: msg,
      });
    }
    if (tx.amount > totalBalance) {
      msg =
        "Oops! That's more than the wallet holds. Please select a lesser amount";
      valid = false;
      this.props.displayGlobalNotification({
        display: true,
        type: 'warning',
        msg: msg,
      });
    }
    if (valid) this.props.displayModal('displaySendTransaction');
  }

  changeGas(e) {
    this.props.updateTransactionToSend({
      name: 'gasPrice',
      value: e * 1000000000,
    });
    // if(this.props.web3 && this.props.web3.web3Instance) {
    //   let web3 = this.props.web3.web3Instance;
    //   this.props.updateTransactionToSend({
    //     name: 'gasPrice',
    //     value: web3.utils.toWei(e, "gwei"),
    //   });
    // }
  }

  estimateGas() {
    let web3 = this.props.web3.web3Instance;
    let tx = this.props.reducers.TransactionToSend;
    web3.eth.estimateGas(
      {
        to: tx.to,
        from: tx.from,
        amount: tx.value,
      },
      (err, res) => {
        err
          ? console.warn(err)
          : this.props.updateTransactionToSend({
              name: 'estimatedGas',
              value: res,
            });
      }
    );
  }

  handleOnKeyUp(e) {
    // TODO:validate inputs here
    // let web3 = this.props.web3.web3Instance;

    // if(web3.utils.isAddress(e.target.value)
    //   ?

    //   this.props.updateTransactionToSend({
    //     name: 'isValid',
    //     value: e.target.value,
    //   });

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
                  <option key={shortid.generate()} value={w}>
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

  renderSlider() {
    let gasStats = this.props.reducers.GasStats;
    const wrapperStyle = { width: 400, margin: 50 };
    return (
      <div style={wrapperStyle}>
        {this.props.web3 && this.props.web3.web3Instance ? (
          <p>
            {Utils.displayPriceFormatter(
              this.props,
              this.props.reducers.TransactionToSend.gasPrice
            )}
          </p>
        ) : (
          <p>{0 || this.props.reducers.TransactionToSend.gasPrice}</p>
        )}
        <Slider
          min={gasStats.safeLow}
          max={gasStats.fast}
          defaultValue={gasStats.average}
          onChange={e => this.changeGas(e)}
        />
      </div>
    );
  }

  render() {
    let wallets = this.props.reducers.Wallets;
    // let txAmt = this.props.reducers.TransactionToSend.amount || 0;
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

        {this.renderSlider()}

        <FormInput />
        {this.props.reducers.Transactions ? (
          <LatestTransactions transactions={this.props.reducers.Transactions} />
        ) : (
          <div>No transactions found...</div>
        )}

        <button
          type="submit"
          className="dapp-block-button"
          onClick={e => {
            e.preventDefault();
            this.estimateGas();
            this.validateForm(this.props.reducers.TransactionToSend);
          }}
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
