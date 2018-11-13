import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';

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
import WalletDropdown from '../elements/WalletDropdown.js';
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

let dcfRadio = ['simpleChecked', 'multisigChecked', 'importWalletChecked'];

class NewWalletContract extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.selectWallet = this.selectWallet.bind(this);
    this.createContract = this.createContract.bind(this);
    this.checkIfImportableWallet = this.checkIfImportableWallet.bind(this);
    let defaultWallet;
    let wallets = this.props.reducers.Wallets;
    for (var prop in wallets) {
      defaultWallet = prop;
      break;
    }
    this.state.reducers.DeployContractForm['MainOwnerAddress'] = defaultWallet;
    this.state.reducers.DeployContractForm.multiSigContract.owners[0] = defaultWallet;
  }

  selectWallet(e) {
    // TODO:validate inputs here
    let obj = { ...this.props.reducers.DeployContractForm };
    obj.MainOwnerAddress = e.target.value;
    // this.props.updateMainContractAddress(obj);
    this.props.updateMainContractAddress({
      name: 'MainOwnerAddress',
      value: e.target.value,
    });
    // this.props.updateDeployContractForm(obj);
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

  checkIfImportableWallet(e) {
    let dcf = this.props.reducers.DeployContractForm;
    let address = dcf.importWalletAddress;
    let web3;
    if (this.props.web3 && this.props.web3.web3Instance) {
      web3 = this.props.web3.web3Instance;
    } else {
      return;
    }

    if (!web3.utils.isAddress(address)) {
      console.log('inside not address');
      this.props.displayGlobalNotification({
        display: true,
        type: 'error',
        msg: 'Invalid address input',
      });
      this.props.updateMainDCF({ name: 'importWalletAddress', value: '' });
      return false;
    }

    let pendingConf = this.props.reducers.ContractsPendingConfirmations;
    let wc = this.props.reducers.WalletContracts;
    let walletContracts = Object.assign({}, pendingConf, wc);
    if (Object.keys(walletContracts).includes(address)) {
      this.props.displayGlobalNotification({
        display: true,
        type: 'warning',
        msg:
          'You are already following this wallet, or it is pending confirmation.',
      });
      this.props.updateMainDCF({ name: 'importWalletAddress', value: '' });
      return false;
    }

    let originalABI = WalletInterfaceItems.walletStubABI;
    return web3.eth.getCode(address).then((err, res) => {
      if (err) {
        this.props.displayGlobalNotification({
          display: true,
          type: 'error',
          msg:
            err === '0x' || err === '0x0'
              ? "A contract doesn't exist at this address"
              : err,
        });
        this.props.updateMainDCF({ name: 'importWalletAddress', value: '' });
        return false;
      }
      if (originalABI !== res) {
        this.props.displayGlobalNotification({
          display: true,
          type: 'error',
          msg:
            'This address does not reference a contract identical to the wallets this form deploys, and cannot be imported',
        });
        this.props.updateMainDCF({ name: 'importWalletAddress', value: '' });
        return false;
      }
      return true;
    });
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
        obj.owners[e.target.getAttribute('id').split('-')[0]] = buttonValue;
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
        this.props.updateMainDCF({ name: 'contract-name', value: buttonValue });
        break;
      case 'MainOwnerAddress':
        this.props.updateMainDCF({
          name: 'MainOwnerAddress',
          value: buttonValue,
        });
        break;
      case 'importWalletAddress':
        this.props.updateMainDCF({
          name: 'importWalletAddress',
          value: buttonValue,
        });
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
    let dcf = this.props.reducers.DeployContractForm;
    let { ownerCount, owners } = dcf.multiSigContract;
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
            value={
              index === 0
                ? dcf.MainOwnerAddress
                : typeof owners[index] == 'undefined'
                  ? ''
                  : owners[index]
            }
            disabled={index === 0}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SecurityIcon
                    type="address"
                    classes="dapp-identicon dapp-small"
                    hash={
                      index === 0
                        ? dcf.MainOwnerAddress
                        : typeof owners[index] == 'undefined'
                          ? this.makeID()
                          : owners[index]
                    }
                  />
                </InputAdornment>
              ),
            }}
          />
        ))}
      </React.Fragment>
    );
  }

  validateMultipleAddress(web3, addresses) {
    const ownerSet = new Set(addresses);
    let arr = [...ownerSet].map(address => web3.utils.isAddress(address));
    if (arr.includes(false)) {
      console.warn('invalid address');
      this.props.displayGlobalNotification({
        display: true,
        type: 'error',
        msg: 'Invalid address input',
      });
      return false;
    }
    if (addresses.length !== ownerSet.size) {
      console.warn('invalid address');
      this.props.displayGlobalNotification({
        display: true,
        type: 'warning',
        msg:
          'Invalid address input - you may have used an address more than once',
      });
      return false;
    }
    return true;
  }

  createContract(e) {
    // this.checkIfImportableWallet(e)

    console.log('e in createContract', e);
    let dcf = this.props.reducers.DeployContractForm;
    console.log(dcf);

    // TODO: finish up import wallet
    // if (dcf.importWalletChecked) {
    //   let bool = this.checkIfImportableWallet(e);
    //   console.log(bool);
    //   return;
    //   // if(!bool) return;
    // }
    // return;

    let msContract = dcf.multiSigContract;
    let web3 = this.props.web3 ? this.props.web3.web3Instance : null;
    // hardcoded bytecode
    // same for imported wallet - there is a web3 check to make the
    // code at the given address is identical to the walletStubABI
    let code = WalletInterfaceItems.walletStubABI;
    // hardcoded JSON interface
    let jsonInterface = WalletInterfaceItems.walletInterface;
    let contract = new web3.eth.Contract(jsonInterface);
    if (!web3) {
      return;
    }

    let options = {
      data: code,
      arguments: '',
      from: dcf.MainOwnerAddress.toLowerCase(),
    };

    let valid = false;
    dcf.multisigChecked === false
      ? ((options.arguments = [
          [dcf.MainOwnerAddress.toLowerCase()], // owner
          1, // require signature count,
          ethereumConfig.dailyLimitDefault.toString(10), // ethereum configs daily limit
        ]),
        (valid = true))
      : ((options.arguments = [
          msContract.owners,
          msContract.confirmationAddressesRequired || 1,
          msContract.dailyLimitAmount ||
            ethereumConfig.dailyLimitDefault.toString(10), // ethereum configs daily limit
        ]),
        (valid = this.validateMultipleAddress(web3, msContract.owners)));

    if (!valid) {
      return;
    }
    console.log('past valid check');

    console.log(options.arguments);
    console.log(dcf);

    //TODO: more security checks from observewallets and account_create
    contract
      .deploy({
        data: code,
        arguments: options.arguments,
      })
      .send({
        from: dcf.MainOwnerAddress.toLowerCase(),
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
      .on('transactionHash', transactionHash => {
        console.log('transactionHash', transactionHash);
        this.props.updatePendingContracts({ name: transactionHash, value: {} });
        this.props.history.push('/accounts');
      })
      .on('receipt', receipt => {
        console.log('reecipt', receipt);
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        receipt['confirmationNumber'] = confirmationNumber;
        receipt['contract-name'] = dcf['contract-name'];
        receipt['address'] = receipt.contractAddress;
        receipt['logs'] = [];
        receipt['balance'] = 0;
        receipt['deployedWalletContract'] = true;

        console.log(receipt);

        this.props.updateWalletContracts({
          name: receipt.contractAddress,
          value: receipt,
        });

        // web3.eth.getBalance(receipt.contractAddress, (err, res) => {
        //   if(err) {
        //     this.props.displayGlobalNotification({
        //       display: true,
        //       type: 'error',
        //       msg: 'Error retreiving balance for the added contract',
        //     });
        //     return;
        //   }
        //   contract.balance = res;
        //   contract['logs'] = [];
        //   con[contract['address']] = contract;
        //   this.props.addObservedContract(con);
        //   this.props.displayGlobalNotification({
        //     display: true,
        //     type: 'success',
        //     msg: 'Added custom contract',
        //   });
        // });
      })
      .then(newContractInstance => {
        console.log('newContractInstance', newContractInstance); // instance with the new contract address
      });
  }

  render() {
    const { classes } = this.props;
    const { DeployContractForm } = this.props.reducers;
    let dcf = this.props.reducers.DeployContractForm;
    let dropdownConfig = {
      component: 'DeployContractForm',
      selectClassName: 'send-from',
      selectName: 'MainOwnerAddress',
    };
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
          <div className="col col-6 mobile-full from">
            <h3>From</h3>
            <div className="dapp-select-account send-from">
              <WalletDropdown dropdownConfig={dropdownConfig} />
            </div>
          </div>
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
                value="importWalletChecked"
                control={
                  <Radio
                    checked={DeployContractForm.importWalletChecked}
                    color="primary"
                  />
                }
                label="IMPORT WALLET"
                name="accountType"
              />
              <Collapse in={DeployContractForm.importWalletChecked}>
                <div className="indented-box">
                  <br />
                  <div className="dapp-address-input">
                    <input
                      type="text"
                      placeholder="Wallet address"
                      className="import"
                      name="importWalletAddress"
                      value={
                        DeployContractForm.importWalletAddress !== ''
                          ? DeployContractForm.importWalletAddress
                          : ''
                      }
                      onChange={e => this.handleChange(e)}
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
