import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    // height: 'auto',
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
  // this.state = {
  //   value: 'male',
  //   checked: {
  //     simple: true,
  //     multisig: false,
  //     importwallet: false,
  //   },
  // };

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.setState(state => ({ checked: !state.checked }));
  }
  // handleFade = event => {
  // 	this.setState(state => ({ checked: !state.checked }));
  // };
  render() {
    const { classes } = this.props;
    const { value, checked } = this.state;
    //   this.state = {
    //   value: 'male',
    //   checked: {
    //     simple: true,
    //     multisig: false,
    //     importwallet: false,
    //   },
    // };
    return (
      <main className="dapp-content">
        <h1>
          <strong>Accounts</strong> Overview
        </h1>

        <div className={classes.radioRoot}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Wallet Contract Type</FormLabel>
            <RadioGroup
              aria-label="Gender"
              name="gender1"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value="simple"
                control={<Radio color="primary" />}
                label="SINGLE OWNER ACCOUNT"
                name="accountType"
              />
              <div className={classes.fadeRoot.simpleRoot}>
                <Fade in={this.state.checked.simple}>
                  <div className="indented-box">
                    <br />
                    <span>
                      Note: If your owner account is compromised, your wallet
                      has no protection.
                    </span>
                  </div>
                </Fade>
              </div>

              <FormControlLabel
                value="multisig"
                control={<Radio color="primary" />}
                label="MULTISIGNATURE WALLET CONTRACT"
                name="accountType"
              />
              <div className={classes.fadeRoot.multisigRoot}>
                <Fade in={this.state.checked.multisig}>
                  <div className="indented-box">
                    <p>
                      This is a joint account controlled by
                      <span className="inline-form" name="multisigSignees">
                        <button
                          type="button"
                          data-name="multisigSignees"
                          data-value="3"
                        >
                          3
                        </button>
                      </span>{' '}
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
                      owners.
                    </p>
                    <h4>Account owners</h4>
                    <div className="dapp-address-input">
                      <input
                        type="text"
                        placeholder="Owner address"
                        className="owners"
                        disabled="true"
                      />
                    </div>
                    <div className="dapp-address-input">
                      <input
                        type="text"
                        placeholder="Owner address"
                        className="owners"
                        disabled="true"
                      />
                    </div>
                    <div className="dapp-address-input">
                      <input
                        type="text"
                        placeholder="Owner address"
                        className="owners"
                        disabled="true"
                      />
                    </div>
                  </div>
                </Fade>
              </div>
              <FormControlLabel
                value="importwallet"
                control={<Radio color="primary" />}
                label="IMPORT WALLET"
                name="accountType"
              />

              <div className={classes.fadeRoot.importwalletRoot}>
                <Fade in={this.state.checked.importwallet}>
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
                </Fade>
              </div>
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

export default withStyles(styles)(NewWalletContract);
