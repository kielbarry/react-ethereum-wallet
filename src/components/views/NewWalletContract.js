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
    let defaultWallet;
    let wallets = this.props.reducers.Wallets;
    for (var prop in wallets) {
      defaultWallet = prop;
      break;
    }

    console.log(this.state);

    this.setState(prevState => ({
      ...prevState,
      reducers: {
        ...prevState.reducers,
        DeployContractForm: {
          ...prevState.reducers.DeployContractForm,
          MainOwnerAddress: defaultWallet,
        },
      },
    }));

    // var stateObj = {...this.state.reducers.DeployContractForm}
    // stateObj.reducers.DeployContractForm = true;
    // this.setState({someProperty})

    // let obj = { ...this.props.reducers.DeployContractForm };
    // obj.MainOwnerAddress = defaultWallet;
    // this.props.updateDeployContractForm(obj);
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
    switch (name) {
      case 'ContractToDeployRadio':
        obj = { ...this.props.reducers.DeployContractForm };
        dcfRadio.map(key => (obj[key] = false));
        obj[buttonValue] = true;
        this.props.updateDCFRadio(obj);
        break;
      case 'multisigSignees':
        obj = { ...this.props.reducers.DeployContractForm.multiSigContract };
        obj.ownerCount = buttonValue;
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
        obj = { ...this.props.reducers.DeployContractForm };
        obj.WalletContractName = buttonValue;
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
    let acc = this.props.reducers.DeployContractForm.multiSigContract
      .ownerCount;
    return (
      <React.Fragment>
        {[...Array(acc).keys()].map(num => (
          <TextField
            key={shortid.generate()}
            label="Owner address"
            className="dapp-address-input owners"
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
    console.log(this.props.reducers.DeployContractForm);
    console.log(this.state.reducers.DeployContractForm);

    return (
      <div className="col col-6 mobile-full from">
        <h3>From</h3>
        <div className="dapp-select-account send-from">
          <select
            className="send-from"
            name="MainOwnerAddress"
            onChange={this.selectWallet}
            value={this.props.reducers.DeployContractForm}
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
            hash={this.state.DeployContractForm.MainOwnerAddress}
          />
        </div>
      </div>
    );
  }

  render() {
    // console.log(this.props)
    console.log(this.props);
    const { classes } = this.props;
    const { DeployContractForm } = this.props.reducers;
    console.log(DeployContractForm);
    console.log(this.props);

    let dcf = this.props.reducers.DeployContractForm;
    return (
      <main className="dapp-content">
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
          <FormControl component="fieldset" className={classes.formControl}>
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
                      data-name="multisigSignees"
                      className="inline-form"
                      name="multisigSignees"
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
          </FormControl>
        </div>
      </main>
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
