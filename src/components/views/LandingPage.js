import React, { Component } from 'react';
import compose from 'recompose/compose';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import SecurityIcon from '../elements/SecurityIcon.js';
import shortid from 'shortid';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NotInterestedSharp from '@material-ui/icons/NotInterestedSharp';
import OfflineBoltSharp from '@material-ui/icons/OfflineBoltSharp';
import Bluetooth from '@material-ui/icons/Bluetooth';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsSharp from '@material-ui/icons/SettingsSharp';

import green from '@material-ui/core/colors/green';

import * as Actions from '../../actions/actions.js';

let iconList = [
  'infura-icon.jpeg',
  'metamask-icon.svg',
  'mist-150x150.png',
  'parity-signer.svg',
];

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    column: true,
  },
  container: {
    paddingLeft: '0px',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    display: 'inline-block',
    verticalAlign: 'middle',
    paddingRight: '30px',
    marginLeft: '0px',
    marginRight: '0px',
    width: '25%',
  },
  select: {
    margin: 'auto',
  },
  column: {
    display: 'inline-block',
    paddingRight: '30px',
    width: '25%',
    verticalAlign: 'middle',
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
  button: {
    margin: theme.spacing.unit,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  ul: {
    listStyleType: 'none',
    paddingLeft: '0px',
  },
});

const theme = createMuiTheme({
  palette: {
    secondary: green,
  },
  typography: {
    useNextVariants: true,
  },
});

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProvider: '',
      selectedPort: '',
      selectedNetwork: '',
      providers: {
        Geth: {
          disabled: false,
          image: 'mist-150x150.png',
        },
        Parity: {
          disabled: false,
          image: 'parity-signer.svg',
        },
        Metamask: {
          disabled: false,
          image: 'metamask-icon.svg',
        },
        Infura: {
          disabled: false,
          image: 'infura-icon.jpeg',
        },
        Ganache: {
          disabled: false,
          image: 'ganache-icon.png',
        },
      },
      networks: {
        MainNet: {
          disabled: false,
          type: 'PoW',
        },
        Rinkeby: {
          // disabled() {
          //   return this.selectedProvider === 'Parity';
          // },
          get disabled() {
            return this.aselectedProvider === 'Parity';
          },
          type: 'PoA / Clique',
        },
        Ropsten: {
          disabled: false,
          type: 'PoW',
        },
        Kovan: {
          // disabled() {
          //   return this.selectedProvider === 'Geth';
          // },
          get disabled() {
            return this.aselectedProvider === 'Geth';
          },
          type: 'PoA / Clique',
        },
        Sokol: {
          // disabled() {
          //   return this.selectedProvider !== 'Parity';
          // },
          get disabled() {
            return this.aselectedProvider !== 'Parity';
          },
          type: 'PoA / Clique',
        },
        Görli: {
          // disabled() {
          //   return this.selectedProvider !== 'Parity';
          // },
          get disabled() {
            return this.aselectedProvider !== 'Parity';
          },
          type: 'PoA / Clique',
        },
        INFURAnet: {
          // disabled() {
          //   return this.selectedProvider !== 'Infura';
          // },
          get disabled() {
            return this.aselectedProvider !== 'Infura';
          },
          type: 'PoA / Clique',
        },
      },
    };
  }

  itemSelected(e) {
    let type = e.target.getAttribute('name');
    if (type === 'provider')
      this.setState({ selectedProvider: e.target.value });
    if (type === 'network') this.setState({ selectedNetwork: e.target.value });
    if (type === 'port') this.setState({ selectedPort: e.target.value });
  }

  // <Tooltip title="Change Network">
  //   <IconButton aria-label="Delete">
  //     <SettingsSharp />
  //   </IconButton>
  // </Tooltip>

  renderIntroduction() {
    const { classes } = this.props;
    return (
      <div className={'introduction container ' + classes.container}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={e => this.props.history.push('/accounts')}
        >
          Dev Button -> Go to Accounts
          <NotInterestedSharp className={classes.rightIcon} />
        </Button>

        <h1>Welcome to your Ethereum Browser Wallet.</h1>
        <div>
          <p>
            To use this dApp, you will need to connect to the Ethereum network.
          </p>
          <p>
            If you do not have any accounts, or if you are unfamiliar with these
            networks, please select the Infura Provider on the Mainnet.
          </p>
          <p>
            You can still interact with the blockchain with Infura, but you will
            &nbsp;
            <strong>not be at risk of losing Ether or Tokens</strong> as you
            will not be connected to an account or wallet.
          </p>
          <p>
            If you are unfamiliar with any of these networks, you can learn more
            about connecting to the network by following these links:
          </p>
          <div className="links">
            <div className={classes.column}>
              Beginner
              <ul className={classes.ul}>
                <li>
                  <a href="https://metamask.io/" target="_blank">
                    Metamask
                  </a>
                </li>
                <li>
                  <a href="https://infura.io/" target="_blank">
                    Infura
                  </a>
                </li>
              </ul>
            </div>
            <div className={classes.column}>
              Medium
              <ul className={classes.ul}>
                <li>
                  <a
                    href="https://truffleframework.com/docs/ganache/quickstart"
                    target="_blank"
                  >
                    Ganache
                  </a>
                </li>
              </ul>
            </div>
            <div className={classes.column}>
              Advanced
              <ul className={classes.ul}>
                <li>
                  <a
                    href="https://github.com/ethereum/go-ethereum/releases"
                    target="_blank"
                  >
                    Geth
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/paritytech/parity-ethereum/releases"
                    target="_blank"
                  >
                    Parity
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderImage() {
    return (
      <img
        style={{ height: '50px', width: '50px', margin: 'auto' }}
        src={this.state.providers[this.state.selectedProvider].image}
      />
    );
  }

  renderProvider() {
    const { classes } = this.props;
    let providers = this.state.providers;
    return (
      <div className={'select-provider container ' + classes.container}>
        <div className={classes.column}>Please select your provider:</div>
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="provider-required">Provider</InputLabel>
          <Select
            native
            className={classes.select}
            value={this.state.selectedProvider}
            onChange={e => this.itemSelected(e)}
            name="provider"
            style={{ margin: 'auto', textAlign: 'center' }}
          >
            <option value="Select a provider" />
            {Object.keys(providers).map(prov => {
              return (
                <option
                  key={shortid.generate()}
                  disabled={providers[prov].disabled}
                >
                  {prov}
                </option>
              );
            })}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <div className={classes.column}>
          {this.state.selectedProvider !== '' ? this.renderImage() : null}
        </div>
      </div>
    );
  }

  renderSelectPort() {
    const { classes } = this.props;
    return (
      <div className={'select-port container ' + classes.container}>
        <div className={classes.column}>Please select your port:</div>
        <FormControl required className={classes.formControl}>
          <TextField
            name="port"
            label="Port Number"
            value={this.state.selectedPort}
            onChange={e => this.itemSelected(e)}
            type="number"
            className={classes.select}
          />
        </FormControl>
        <div className={classes.column}>
          {this.state.selectedPort === '' ? null : this.state.selectedPort ===
            '8546' || this.state.selectedPort === '8545' ? (
            <div>
              This is the
              <strong>
                <span style={{ color: 'Peru' }}> default port </span>
              </strong>
              for Geth or Parity. Consider configuring your node with a
              different port.
            </div>
          ) : (
            <span className="icon-like" style={{ color: 'green' }} />
          )}
        </div>
      </div>
    );
  }

  renderNetwork() {
    const { classes } = this.props;
    let networks = this.state.networks;
    return (
      <div className={'select-network container ' + classes.container}>
        <div className={classes.column}>Please select your network:</div>
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="network-required">Network</InputLabel>
          <Select
            native
            className={classes.select}
            value={this.state.selectedNetwork}
            onChange={e => this.itemSelected(e)}
            name="network"
          >
            <option value="Select a network" />
            {Object.keys(networks).map(nw => {
              return (
                <option
                  key={shortid.generate()}
                  // disabled={networks[nw].disabled}
                >
                  {nw}
                </option>
              );
            })}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <div className={classes.column}>
          {this.state.selectedNetwork === '' ? null : this.state
            .selectedNetwork !== 'MainNet' ? (
            <div>
              This is a{' '}
              <strong>
                <span style={{ color: 'Peru' }}>TEST NET</span>
              </strong>
              . Ether or token balances have
              <em> no real world value.</em>
            </div>
          ) : (
            <div>
              Ethereum{' '}
              <strong>
                <span style={{ color: 'green' }}>MAIN NET</span>
              </strong>
              . Balances here represent real-world, monetary value
            </div>
          )}
        </div>
      </div>
    );
  }

  resetForm(e) {
    this.setState({
      selectedNetwork: '',
      selectedProvider: '',
      selectedPort: '',
      init: true,
    });
  }

  setProviderConfig(e) {
    this.props.setEthereumProviderConfig({
      selectedProvider: this.state.selectedProvider,
      selectedPort: this.state.selectedPort,
      selectedNetwork: this.state.selectedNetwork,
    });
  }

  renderButtons() {
    const { classes } = this.props;
    return (
      <div className={'container buttonContainer ' + classes.container}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={e => this.resetForm(e)}
        >
          Reset Form
          <NotInterestedSharp className={classes.rightIcon} />
        </Button>
        <MuiThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="secondary"
            // className={classes.button}
            onClick={e => this.setProviderConfig(e)}
          >
            Connect to Ethereum
            <OfflineBoltSharp className={classes.rightIcon} />
          </Button>
        </MuiThemeProvider>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderIntroduction()}
        {this.renderProvider()}
        {this.state.selectedProvider === 'Geth' ||
        this.state.selectedProvider === 'Parity' ||
        this.state.selectedProvider === 'Ganache'
          ? this.renderSelectPort()
          : null}
        {this.renderNetwork()}
        {this.renderButtons()}
      </div>
    );
  }
}

export default compose(
  withStyles(styles, { name: 'LandingPage' }),
  connect(
    null,
    { ...Actions }
  )
)(LandingPage);
