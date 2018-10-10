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
    // importwalletHeight: this.state.checked.importwallet ? 'auto' : 0,
    // multisigHeight: this.state.checked.multisig ? 'auto' : 0,
    // simpleHeight: this.state.checked.simple ? 'auto' : 0,
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

class NewWalletContract extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    // this.state = this.props
  }

  state = {
    checked: {
      simple: false,
      multisig: true,
      importwallet: false,
    },
    multiSigContract: {
      ownerCount: 3,
      confirmationAddressesRequired: 1,
    },
  };

  // shouldComponentUpdate(prevProps, prevState){
  //   console.log(this.props)
  // }

  handleChange = e => {
    // console.log(e)
    // console.log(e.target)

    let buttonValue = e.target.value;
    let name = e.target.name;

    let obj = {};

    switch (name) {
      case 'ContractToDeploy':
        obj = { ...this.state.checked };
        Object.keys(this.state.checked).map(key => {
          obj[key] = false;
          this.setState({ checked: obj });
        });
        obj[buttonValue] = true;
        this.setState({ checked: obj });
        break;
      case 'multisigSignees':
        obj = { ...this.state.multiSigContract };
        obj.ownerCount = buttonValue;
        this.setState({ multiSigContract: obj });
        break;
      case 'multisigSigneesRequired':
        obj = { ...this.state.multiSigContract };
        obj.confirmationAddressesRequired = buttonValue;
        this.setState({ multiSigContract: obj });
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
    return (
      <main className="dapp-content">
        <h1>
          <strong>Accounts</strong> Overview
        </h1>
        <div className={classes.radioRoot}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Wallet Contract Type</FormLabel>
            <RadioGroup
              aria-label="ContractToDeploy"
              name="ContractToDeploy"
              className={classes.group}
              value={this.state.value}
              onChange={e => this.handleChange(e)}
            >
              <FormControlLabel
                value="simple"
                control={
                  <Radio checked={this.state.checked.simple} color="primary" />
                }
                label="SINGLE OWNER ACCOUNT"
                name="accountType"
              />
              <Collapse in={this.state.checked.simple}>
                <div className="indented-box">
                  <br />
                  <span>
                    Note: If your owner account is compromised, your wallet has
                    no protection.
                  </span>
                </div>
              </Collapse>
              <FormControlLabel
                value="multisig"
                control={
                  <Radio
                    checked={this.state.checked.multisig}
                    color="primary"
                  />
                }
                label="MULTISIGNATURE WALLET CONTRACT"
                name="accountType"
              />
              <Collapse in={this.state.checked.multisig}>
                <div className="indented-box">
                  <p>
                    This is a joint account controlled by
                    <TextField
                      select
                      data-name="multisigSignees"
                      className="inline-form"
                      name="multisigSignees"
                      // className={classes.textField}
                      value={this.state.multiSigContract.ownerCount}
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
                        this.state.multiSigContract
                          .confirmationAddressesRequired
                      }
                      onChange={e => this.handleChange(e)}
                      margin="normal"
                      variant="filled"
                    >
                      {[
                        ...Array(this.state.multiSigContract.ownerCount).keys(),
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
                value="importwallet"
                control={
                  <Radio
                    checked={this.state.checked.importwallet}
                    color="primary"
                  />
                }
                label="IMPORT WALLET"
                name="accountType"
              />
              <Collapse in={this.state.checked.importwallet}>
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
    null
  )
)(NewWalletContract);
