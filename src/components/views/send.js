import React, { Component } from 'react';

// import Slider from '../elements/Slider.jsx';
// import TotalGas from '../elements/TotalGas.jsx';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
// import Range from 'rc-slider/lib/Range';
// import Tooltip from 'rc-tooltip';
// import Switch from '@material-ui/core/Switch';

import shortid from 'shortid';
// import ToggleButton from 'react-toggle-button';
// import "react-toggle/style.css";
// import makeBlockie from 'ethereum-blockies-base64';

//exp
// import FormInput from '../elements/FormInput.jsx';
// import LatestTransactions from '../elements/LatestTransactions.jsx';
import NumberFormat from 'react-number-format';
import SecurityIcon from '../elements/SecurityIcon.jsx';
import { connect } from 'react-redux';
import * as Actions from '../../actions/actions.js';
import * as Utils from '../../utils/utils.js';

// import classNames from 'classnames';
// import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';

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
    // this.handleSwitch = this.handleSwitch.bind(this);
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
    let target = e.target.getAttribute('name');
    let targetValue = e.target.value;

    if (target === 'value' && this.props.web3 && targetValue) {
      let web3 = this.props.web3.web3Instance;
      targetValue = web3.utils.toWei(targetValue, 'ETHER');
    }

    console.log(target);
    console.log(targetValue);

    this.props.updateTransactionToSend({
      name: target,
      value: targetValue,
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
    console.log(e);
    // console.log(this.state)

    // console.log(this.props.reducers.Wallets)
    // console.log(this.props.reducers.Wallets[this.state.fromWallet])
    // console.log(this.props.reducers.TransactionToSend)
    this.props.updateTransactionToSend({
      name: 'value',
      value: this.props.reducers.Wallets[this.state.fromWallet],
    });
  }

  renderWalletDropDown() {
    let wallets = this.props.reducers.Wallets;
    //     const styles = theme => ({
    //   container: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //   },
    //   textField: {
    //     marginLeft: theme.spacing.unit,
    //     marginRight: theme.spacing.unit,
    //     width: 200,
    //   },
    //   dense: {
    //     marginTop: 19,
    //   },
    //   menu: {
    //     width: 200,
    //   },
    // });
    // const { classes } = this.props;

    return (
      <div className="col col-6 mobile-full from">
        {/*
        <div className="dapp-select-account send-from">
          <SecurityIcon
              type="address"
              classes="dapp-identicon dapp-small"
              hash={this.state.fromWallet}
            />
          <TextField
            // id="standard-select-currency"
            // className="send-from"
            // className={classNames(classes.textField, classes.dense, "send-from")}
              name="from"
              onChange={this.selectWallet}
              value={this.state.fromWallet}
            select
            label="Select"
            // className={classes.textField}
            // value={this.state.currency}
            // onChange={this.handleChange('currency')}
            // SelectProps={wallets}
            // helperText="Please select your currency"
            // margin="normal"
          >
          {Object.keys(wallets).map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
          id="standard-with-placeholder"
          error
          label="With placeholder"
          placeholder="Placeholder"
          // className={classes.textField}
          margin="normal"
        />
        </div>
      */}

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
                </React.Fragment>
              );
            })}
          </select>
          <SecurityIcon
            type="address"
            classes="dapp-identicon dapp-small"
            hash={this.state.fromWallet}
          />
        </div>
      </div>
    );
  }

  renderSlider() {
    let gasStats = this.props.reducers.GasStats;
    let gasPrice = this.props.reducers.TransactionToSend.gasPrice;
    // const wrapperStyle = { width: 400, margin: 50 };
    return (
      <React.Fragment>
        <div className="col col-7 mobile-full">
          <h3>Select Fee</h3>
          <div className="dapp-select-gas-price">
            {this.props.web3 && this.props.web3.web3Instance ? (
              <span>
                {Utils.displayPriceFormatter(this.props, gasPrice, 'ETHER')}
                <span>ETHER</span>
              </span>
            ) : (
              <span>{0 || gasPrice}</span>
            )}
            <Slider
              min={gasStats.safeLow}
              max={gasStats.fast}
              defaultValue={gasStats.average}
              onChange={e => this.changeGas(e)}
            />
          </div>
        </div>
        <div className="col col-5 mobile-full send-info">
          <br />
          <br />
          This is the most amount of money that might be used to process this
          transaction. Your transaction will be mined
          <strong>
            probably within
            {/*
            {Utils.floatToTime(gasPrice/1000000000)}
          */}
          </strong>
          .
        </div>
        <div className="dapp-clear-fix" />
      </React.Fragment>
    );
  }

  // handleSwitch = name => event => {
  //   this.setState({ [name]: event.target.checked });
  // };

  render() {
    let wallets = this.props.reducers.Wallets;
    // let txAmt = this.props.reducers.TransactionToSend.amount || 0;

    // let state = {
    //   switchChecked: true,
    // };

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
              // value={this.props.reducers.TransactionToSend.value || ''}
              onKeyUp={e => this.handleOnKeyUp(e)}
              // value={txAmt}
            />
            <br />
            <label>
              {/*
              <input
                type="checkbox"
                className="send-all"
                onChange={e => this.toggleCheckbox(e)}
              />
              Send everything
              */}
            </label>

            <p className="send-info">
              You want to send
              <strong>
                {this.props.web3 && this.props.web3.web3Instance
                  ? ' ' +
                    Utils.displayPriceFormatter(
                      this.props,
                      this.props.reducers.TransactionToSend.value
                    ) +
                    ' ' +
                    this.props.reducers.currency
                  : 0 + ' ' + this.props.reducers.currency}
              </strong>{' '}
              in Ether, using exchange rates from
              <a
                href="https://www.cryptocompare.com/coins/eth/overview/BTC"
                target="noopener noreferrer _blank"
              >
                {' '}
                cryptocompare.com
              </a>
              .<br />
              Which is currently an equivalent of
              <strong>
                {this.props.web3 && this.props.web3.web3Instance
                  ? ' ' +
                    Utils.displayPriceFormatter(
                      this.props,
                      this.props.reducers.TransactionToSend.value,
                      'ETHER'
                    ) +
                    ' ETHER'
                  : 0 + ' ETHER'}
              </strong>
              .
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
                  ? ' ' +
                    Utils.displayPriceFormatter(
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
        <div className="row clear">{this.renderSlider()}</div>
        {/*
        Slowest:
        {this.props.reducers.GasStats !== {}
          ? Utils.floatToTime(this.props.reducers.GasStats.safeLowWait)
          : 0}
        <Switch
          checked={this.state.switchChecked}
          checked={true}
          onChange={this.handleSwitch('switchChecked')}
          value="checkedB"
          color="primary"
        />
        Fastest:
        {this.props.reducers.GasStats !== {}
          ? Utils.floatToTime(this.props.reducers.GasStats.fastWait)
          : 0}
        <FormInput />
      */}
        {/*
        { this.props.reducers.Transactions
          ? <LatestTransactions Transactionsctions={this.props.reducers.Transactions}/>
          : <div>No transactions found...</div>  
        }
      */}
        <div className="row clear total">
          <div className="col col-12 mobile-full">
            <h3>total</h3>
            <span className="amount">
              {this.props.web3 && this.props.web3.web3Instance
                ? ' ' +
                  Utils.displayPriceFormatter(
                    this.props,
                    this.props.reducers.TransactionToSend.value +
                      this.props.reducers.TransactionToSend.gasPrice
                  ) +
                  ' ' +
                  this.props.reducers.currency
                : 0 + ' ' + this.props.reducers.currency}
            </span>
            <br />
            Gas is paid by the owner of the wallet contract (0.000044187 ETHER)
          </div>
          <div className="dapp-clear-fix" />
        </div>
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
