import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import TokenBox from './elements/TokenBox.js';
import { ContractSectionList } from './../constants/FieldConstants.js';
import { ReplicateBinanceToken } from './../constants/DevConstants.js';
import WalletDropdown from '../components/elements/WalletDropdown.js';
import ButtonDescription from './ButtonDescription.js';
import * as Actions from './../actions/actions.js';
import * as Utils from '../utils/utils.js';
import { combineWallets, sortByBalance } from '../utils/helperFunctions.js';

import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const buttonTitle = 'Deploy Token';
const buttonDescription = 'This feature is for testing in development';

export class DeployToken extends Component {
  constructor(props) {
    super(props);
    let { Wallets, WalletContracts } = this.props;
    let combinedWallets = combineWallets(Wallets, WalletContracts);
    this.state = {
      deployingAddress: combinedWallets[0].address,
      disabledWallet: '',
    };
    this.deployBinanceToken = this.deployBinanceToken.bind(this);
    this.returnDeployTokenAddress = this.returnDeployTokenAddress.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.setState({ disabledWallet: false });
  }

  deployBinanceToken() {
    this.setState({ disabledWallet: true });
    let web3 = this.props.web3 ? this.props.web3.web3Instance : null;
    if (!web3) {
      return;
    }
    let code = ReplicateBinanceToken.ABI;
    let args = [18000000, 'Asdf', 18, 'bnb0'];
    let options = {
      data: code,
      arguments: [...args],
      from: this.state.deployingAddress,
    };

    let jsonInterface = ReplicateBinanceToken.jsonInterface;
    let contract = new web3.eth.Contract(jsonInterface);

    contract
      .deploy({
        data: code,
        arguments: options.arguments,
      })
      .send({
        from: this.state.deployingAddress,
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
        this.props.displayGlobalNotification({
          display: true,
          type: 'warning',
          msg: 'Pending contract deployment',
        });
      })
      .on('receipt', receipt => {
        contract.options.address = receipt.contractAddress;
        contract.methods['totalSupply']()
          .call()
          .then(totalSupply => {
            console.log('totalSupply', totalSupply);
            let token = {
              address: receipt.contractAddress,
              name: 'Asdf',
              symbol: 'bnb0',
              decimals: '18',
            };
            this.props.addObservedToken({
              address: token.address,
              value: Object.assign({}, token, {
                totalSupply: totalSupply,
              }),
            });
          });
      });
  }

  returnDeployTokenAddress(e) {
    this.setState({ deployingAddress: e.target.value });
  }

  renderButton() {
    const { classes } = this.props;
    return (
      <Fab
        color="primary"
        aria-label="Add"
        className={classes.fab}
        onClick={this.deployBinanceToken}
      >
        <AddIcon />
      </Fab>
    );
  }

  renderWallet() {
    let dropdownConfig = {
      component: 'deployToken',
      selectClassName: 'send-from',
      selectName: 'from',
    };
    return (
      <React.Fragment>
        <h3 style={{ display: 'inline-block' }}>Deploy a ERC-20 token</h3>
        <div
          className="dapp-select-account send-from"
          style={{ display: 'inline-block', marginLeft: '20px' }}
        >
          <WalletDropdown
            disabled={this.state.disabledWallet}
            dropdownConfig={dropdownConfig}
            returnDeployTokenAddress={this.returnDeployTokenAddress}
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="contracts-view-custom-tokens">
        <ButtonDescription
          title={buttonTitle}
          description={buttonDescription}
        />
        <div className="container row">
          {this.renderButton()}
          {this.renderWallet()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Wallets: state.reducers.Wallets,
  WalletContracts: state.reducers.WalletContracts,
  web3: state.web3,
});

export default compose(
  withStyles(styles, { name: 'CustomContracts' }),
  connect(
    mapStateToProps,
    { ...Actions }
  )
)(DeployToken);
