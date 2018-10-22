import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import * as Actions from '../../actions/actions.js';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// import Switch from '@material-ui/core/Switch';
// import Paper from '@material-ui/core/Paper';
// import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
// import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';

import SecurityIcon from '../elements/SecurityIcon.js';
import shortid from 'shortid';
import * as Utils from '../../utils/utils.js';

import {
  WalletInterfaceItems,
  ethereumConfig,
} from '../../constants/InitConstants.js';

const styles = theme => ({
  radioRoot: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  fadeRoot: {
    height: 'auto',
    noHeight: 0,
  },
  paper: {
    margin: theme.spacing.unit,
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
});

let dcfRadio = ['simpleChecked', 'multisigChecked', 'importwalletChecked'];

class NewWalletContract extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.selectWallet = this.selectWallet.bind(this);
    this.createContract = this.createContract.bind(this);
    let defaultWallet;
    let wallets = this.props.reducers.Wallets;
    for (var prop in wallets) {
      defaultWallet = prop;
      break;
    }
    this.state.reducers.DeployContractForm['MainOwnerAddress'] = defaultWallet;
    console.log(this.state.reducers.DeployContractForm['MainOwnerAddress']);
  }

  selectWallet(e) {
    // TODO:validate inputs here
    let obj = { ...this.props.reducers.DeployContractForm };
    obj.MainOwnerAddress = e.target.value;
    this.props.updateDeployContractForm(obj);
  }

  shouldComponentUpdate(prevProps, prevState) {
    let dcf = this.props.reducers.DeployContractForm;
    let prevDcf = prevProps.reducers.DeployContractForm;
    if (
      dcf !== prevDcf ||
      dcf.multiSigContract !== prevDcf.multiSigContract ||
      dcf.MainOwnerAddress !== prevDcf.MainOwnerAddress
    ) {
      return true;
    }
    return false;
  }

  handleChange = e => {
    let buttonValue = e.target.value;
    let name = e.target.name;
    let obj = {};
    console.log(buttonValue, name);
    switch (name) {
      case 'ContractToDeployRadio':
        obj = { ...this.props.reducers.DeployContractForm };
        dcfRadio.map(key => (obj[key] = false));
        obj[buttonValue] = true;
        this.props.updateDCFRadio(obj);
        break;
      case 'multisigSigneesCount':
        obj = { ...this.props.reducers.DeployContractForm.multiSigContract };
        obj.ownerCount = buttonValue;
        this.props.updateDeployContractForm(obj);
        break;
      case 'multisigSigneesAddresses':
        obj = { ...this.props.reducers.DeployContractForm.multiSigContract };
        console.log(obj);
        console.log(buttonValue);
        obj.owners[e.target.getAttribute('id').split('-')[0]] = buttonValue;
        console.log(obj);
        this.props.updateDeployContractForm(obj);
        break;
      case 'multisigSigneesRequired':
        obj = { ...this.props.reducers.DeployContractForm.multiSigContract };
        obj.confirmationAddressesRequired = buttonValue;
        this.props.updateDeployContractForm(obj);
        break;
      case 'dailyLimitAmount':
        obj = { ...this.props.reducers.DeployContractForm.multiSigContract };
        obj.dailyLimitAmount = buttonValue;
        this.props.updateDeployContractForm(obj);
        break;
      case 'WalletContractName':
        obj = { ...this.props.reducers.DeployContractForm.multiSigContract };
        obj.WalletContractName = buttonValue;
        console.log(obj);
        this.props.updateDeployContractForm(obj);
        break;
      case 'MainOwnerAddress':
        obj = { ...this.props.reducers.DeployContractForm };
        obj.MainOwnerAddress = buttonValue;
        this.props.updateDeployContractForm(obj);
        break;
      default:
        break;
    }
  };

  // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  makeID() {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  renderMultiSigOwners() {
    let {
      ownerCount,
      owners,
    } = this.props.reducers.DeployContractForm.multiSigContract;
    return (
      <React.Fragment>
        {[...Array(ownerCount).keys()].map((num, index) => (
          <TextField
            key={shortid.generate()}
            id={index + '-multiSigAddress'}
            onChange={e => this.handleChange(e)}
            data-name="multisigSigneesAddresses"
            name="multisigSigneesAddresses"
            label="Owner address"
            className="dapp-address-input owners"
            value={owners[index]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SecurityIcon
                    type="address"
                    classes="dapp-identicon dapp-small"
                    hash={this.makeID()}
                  />
                </InputAdornment>
              ),
            }}
          />
        ))}
      </React.Fragment>
    );
  }

  renderWalletDropDown() {
    let wallets = this.props.reducers.Wallets;
    let dcf = this.props.reducers.DeployContractForm;
    return (
      <div className="col col-6 mobile-full from">
        <h3>From</h3>
        <div className="dapp-select-account send-from">
          <select
            className="send-from"
            name="MainOwnerAddress"
            onChange={this.selectWallet}
            value={this.props.reducers.DeployContractForm.MainOwnerAddress}
          >
            {Object.keys(wallets).map(w => {
              let balance = wallets[w];
              return (
                <React.Fragment>
                  <option key={shortid.generate()} value={w}>
                    {this.props.web3 && this.props.web3.web3Instance
                      ? Utils.displayPriceFormatter(
                          this.props,
                          balance,
                          'ETHER'
                        )
                      : balance}
                    &nbsp; - &nbsp;
                    {w}
                  </option>
                </React.Fragment>
              );
            })}
          </select>
          <SecurityIcon
            type="address"
            classes="dapp-identicon dapp-small"
            hash={this.state.reducers.DeployContractForm.MainOwnerAddress}
          />
        </div>
      </div>
    );
  }

  createContract(e) {
    let dcf = this.props.reducers.DeployContractForm;
    let web3 = this.props.web3 ? this.props.web3.web3Instance : null;
    // hardcoded bytecode
    let code = WalletInterfaceItems.walletStubABI;
    // hardcoded JSON interface
    let jsonInterface = WalletInterfaceItems.walletInterface;
    let contract = new web3.eth.Contract(jsonInterface);
    if (!web3) {
      return;
    }

    if (dcf.multisigChecked === false) {
      contract
        .deploy({
          data: code,
          arguments: [
            [dcf.MainOwnerAddress.toLowerCase()], // owner
            1, // require signature count,
            ethereumConfig.dailyLimitDefault.toString(10), // ethereum configs daily limit
          ],
        })
        .send({
          from: dcf.MainOwnerAddress,
          gas: 3000000,
        })
        .on('error', err => {
          console.warn('error deploying contract', err);
          this.props.displayGlobalNotification({
            display: true,
            type: 'error',
            msg: err.message,
          });
        })
        .on('transactionHash', console.log)
        .on('receipt', console.log)
        .on('confirmation', (confirmationNumber, receipt) => {
          console.log(confirmationNumber);
          console.log(receipt);
        })
        .then(newContractInstance => {
          console.log(newContractInstance); // instance with the new contract address
        });
    }
  }

  render() {
    const { classes } = this.props;
    const { DeployContractForm } = this.props.reducers;
    let dcf = this.props.reducers.DeployContractForm;
    return (
      <React.Fragment>
        <FormControl component="fieldset" className={classes.formControl}>
          <h1>
            New <strong>wallet contract</strong>
          </h1>
          <input
            type="text"
            name="WalletContractName"
            placeholder="Wallet contract name"
            onChange={e => this.handleChange(e)}
            autoFocus={true}
          />
          <h2>Select owner</h2>

          {dcf && dcf.MainOwnerAddress ? this.renderWalletDropDown() : <div />}

          <div className={classes.radioRoot}>
            <FormLabel component="legend">Wallet Contract Type</FormLabel>
            <RadioGroup
              aria-label="ContractToDeployRadio"
              name="ContractToDeployRadio"
              className={classes.group}
              value={this.state.value}
              onChange={e => this.handleChange(e)}
            >
              <FormControlLabel
                value="simpleChecked"
                control={
                  <Radio
                    checked={DeployContractForm.simpleChecked}
                    color="primary"
                  />
                }
                label="SINGLE OWNER ACCOUNT"
                name="accountType"
              />
              <Collapse in={DeployContractForm.simpleChecked}>
                <div className="indented-box">
                  <span
                    style={{
                      verticalAlign: 'middle',
                      lineHeight: '35px',
                    }}
                  >
                    Note: If your owner account is compromised, your wallet has
                    no protection.
                  </span>
                </div>
              </Collapse>
              <FormControlLabel
                value="multisigChecked"
                control={
                  <Radio
                    checked={DeployContractForm.multisigChecked}
                    color="primary"
                  />
                }
                label="MULTISIGNATURE WALLET CONTRACT"
                name="accountType"
              />
              <Collapse in={DeployContractForm.multisigChecked}>
                <div className="indented-box">
                  <p
                    style={{
                      verticalAlign: 'middle',
                      lineHeight: '35px',
                    }}
                  >
                    This is a joint account controlled by &nbsp;
                    <TextField
                      select
                      data-name="multisigSigneesCount"
                      className="inline-form"
                      name="multisigSigneesCount"
                      multiline
                      // className={classes.textField}
                      value={DeployContractForm.multiSigContract.ownerCount}
                      onChange={e => this.handleChange(e)}
                      // margin="normal"
                      // variant="filled"
                    >
                      {[...Array(10).keys()].map(num => (
                        <MenuItem key={num + 1} value={num + 1}>
                          {num + 1}
                        </MenuItem>
                      ))}
                    </TextField>
                    owners. You can send up to &nbsp;
                    <TextField
                      value={
                        DeployContractForm.multiSigContract.dailyLimitAmount
                      }
                      onChange={e => this.handleChange(e)}
                      type="number"
                      className="inline-form"
                      name="dailyLimitAmount"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    &nbsp;Ether per day.
                  </p>
                  <p
                    style={{
                      verticalAlign: 'middle',
                      lineHeight: '35px',
                    }}
                  >
                    Any transaction over that daily limit requires the
                    confirmation of &nbsp;
                    <TextField
                      select
                      data-name="multisigSigneesRequired"
                      className="inline-form"
                      // data-name="multisigSignatures"
                      name="multisigSigneesRequired"
                      value={
                        DeployContractForm.multiSigContract
                          .confirmationAddressesRequired
                      }
                      onChange={e => this.handleChange(e)}
                    >
                      {[
                        ...Array(
                          DeployContractForm.multiSigContract.ownerCount
                        ).keys(),
                      ].map(num => (
                        <MenuItem key={num + 1} value={num + 1}>
                          {num + 1}
                        </MenuItem>
                      ))}
                    </TextField>
                    &nbsp; owners.
                  </p>
                  <h4>Account owners</h4>
                  {this.renderMultiSigOwners()}
                </div>
              </Collapse>
              <FormControlLabel
                value="importwalletChecked"
                control={
                  <Radio
                    checked={DeployContractForm.importwalletChecked}
                    color="primary"
                  />
                }
                label="IMPORT WALLET"
                name="accountType"
              />
              <Collapse in={DeployContractForm.importwalletChecked}>
                <div className="indented-box">
                  <br />
                  <div className="dapp-address-input">
                    <input
                      type="text"
                      placeholder="Wallet address"
                      className="import"
                    />
                  </div>
                  <p className="invalid" />
                </div>
              </Collapse>
            </RadioGroup>
            <button
              className="dapp-block-button"
              type="submit"
              onClick={e => this.createContract(e)}
            >
              Create
            </button>
          </div>
        </FormControl>
      </React.Fragment>
    );
  }
}

NewWalletContract.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return state;
};

export default compose(
  withStyles(styles, { name: 'NewWalletContract' }),
  connect(
    mapStateToProps,
    { ...Actions }
  )
)(NewWalletContract);
