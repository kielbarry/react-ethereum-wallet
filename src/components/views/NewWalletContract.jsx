import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import * as Actions from '../../actions/actions.js';
import * as Utils from '../../utils/utils.js';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (
      this.props.reducers.DeployContractForm !==
        prevProps.reducers.DeployContractForm ||
      this.props.reducers.DeployContractForm.multiSigContract !==
        prevProps.reducers.DeployContractForm.multiSigContract
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
        // this.setState({ multiSigContract: obj });
        this.props.updateDeployContractForm(obj);
        break;
      case 'multisigSigneesRequired':
        obj = { ...this.props.reducers.DeployContractForm.multiSigContract };
        obj.confirmationAddressesRequired = buttonValue;
        // this.setState({ multiSigContract: obj });
        this.props.updateDeployContractForm(obj);
        break;
      default:
        break;
    }
    console.log('state after setstate', this.state);
  };

  renderMultiSigOwners() {
    return (
      <div className="dapp-address-input">
        <input type="text" placeholder="Owner address" className="owners" />
      </div>
    );
  }

  render() {
    // console.log(this.props)
    const { classes } = this.props;
    const { DeployContractForm } = this.props.reducers;
    console.log(DeployContractForm);
    return (
      <main className="dapp-content">
        <h1>
          <strong>Accounts</strong> Overview
        </h1>
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
                  <br />
                  <span>
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
                  <p>
                    This is a joint account controlled by
                    <TextField
                      select
                      data-name="multisigSignees"
                      className="inline-form"
                      name="multisigSignees"
                      // className={classes.textField}
                      value={DeployContractForm.multiSigContract.ownerCount}
                      onChange={e => this.handleChange(e)}
                      margin="normal"
                      variant="filled"
                    >
                      {[...Array(10).keys()].map(num => (
                        <MenuItem key={num + 1} value={num + 1}>
                          {num + 1}
                        </MenuItem>
                      ))}
                    </TextField>
                    owners. You can send up to
                    <span className="inline-form" name="dailyLimitAmount">
                      <input
                        type="text"
                        name="dailyLimitAmount"
                        required=""
                        size="2"
                      />
                    </span>{' '}
                    Ether per day.
                  </p>
                  <p>
                    Any transaction over that daily limit requires the
                    confirmation of
                    <span className="inline-form" name="multisigSignatures">
                      <button
                        type="button"
                        data-name="multisigSignatures"
                        data-value="2"
                      >
                        2
                      </button>
                    </span>{' '}
                    <TextField
                      select
                      data-name="multisigSigneesRequired"
                      className="inline-form"
                      name="multisigSigneesRequired"
                      value={
                        DeployContractForm.multiSigContract
                          .confirmationAddressesRequired
                      }
                      onChange={e => this.handleChange(e)}
                      margin="normal"
                      variant="filled"
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
                    owners.
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
