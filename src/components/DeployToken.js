import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import TokenBox from './elements/TokenBox.js';
import { ContractSectionList } from './../constants/FieldConstants.js';
import { ReplicateBinanceToken } from './../constants/DevConstants.js';
import WalletDropdown from '../components/elements/WalletDropdown.js';
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

// snapshotted
const TokenDescription = () => {
  return (
    <React.Fragment>
      <h2>Deploy Token</h2>
      <p>This feature is for testing in development</p>
      <div className="dapp-clear-fix" />
    </React.Fragment>
  );
};

export class DeployToken extends Component {
  // snapshotted

  constructor(props) {
    super(props);
    let { Wallets, WalletContracts } = this.props.reducers;
    console.log(ReplicateBinanceToken);
    let combinedWallets = combineWallets(Wallets, WalletContracts);
    this.state = {
      deployingAddress: combinedWallets[0].address,
    };
    this.deployBinanceToken = this.deployBinanceToken.bind(this);
    this.returnDeployTokenAddress = this.returnDeployTokenAddress.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  deployBinanceToken() {
    let web3 = this.props.web3 ? this.props.web3.web3Instance : null;
    if (!web3) {
      return;
    }

    console.log(ReplicateBinanceToken.ABI);

    let code = ReplicateBinanceToken.ABI;

    // uint256 initialSupply,
    //     string tokenName,
    //     uint8 decimalUnits,
    //     string tokenSymbol

    let args = [18000000, 'Asdf', 18, 'bnb0'];

    let options = {
      data: code,
      // arguments: '',
      arguments: [...args],
      from: this.state.deployingAddress,
    };

    console.log(ReplicateBinanceToken.jsonInterface);
    let jsonInterface = ReplicateBinanceToken.jsonInterface;
    let contract = new web3.eth.Contract(jsonInterface);

    console.log(options);
    console.log(this.state);

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
        console.log('transactionHash', transactionHash);
        // this.props.updatePendingContracts({ name: transactionHash, value: {} });
        this.props.displayGlobalNotification({
          display: true,
          type: 'warning',
          msg: 'Pending contract deployment',
        });
      })
      .on('receipt', receipt => {
        console.log('reecipt', receipt);
        web3.eth
          .call({
            to: receipt.contractAddress.replace(' ', ''), // contract address
            // data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
            data: '0x70a08231000000000000000000000000', //+ account.substring(2).replace(' ', '')
          })
          .then(result => {
            console.log('result');
            let token = {
              address: receipt.contractAddress,
              name: 'Asdf',
              symbol: 'bnb0',
              decimals: '18',
            };
            let tokenAmt = web3.utils.toBN(result);
            this.props.addObservedToken({
              address: token.address,
              value: Object.assign({}, token, {
                amount: web3.utils.fromWei(tokenAmt, 'ether'),
              }),
            });
            this.props.displayGlobalNotification({
              display: true,
              type: 'success',
              msg: 'Added fake binance token',
            });
          });
      });

    // web3.eth
    //   .call({
    //     to: address.replace(' ', ''), // contract address
    //     // data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
    //     data: '0x70a08231000000000000000000000000', //+ account.substring(2).replace(' ', '')
    //   })
    //   .then(result => {
    //     let tokenAmt = web3.utils.toBN(result);
    //     // if (!tokenAmt.isZero()) {
    //     this.props.addObservedToken({
    //       address: token.address,
    //       value: Object.assign({}, token, {
    //         amount: web3.utils.fromWei(tokenAmt, 'ether'),
    //       }),
    //     });
    //     this.props.displayGlobalNotification({
    //       display: true,
    //       type: 'success',
    //       msg: 'Added custom token',
    //     });
    //     // }
    //   });
  }

  returnDeployTokenAddress(e) {
    // console.log(e)
    // console.log(e.target)
    // console.log(e.target.value)
    // console.log(this.props)
    // console.log(this.props.deployBinanceToken)
    // console.log(this.deployBinanceToken)
    this.setState(
      { deployingAddress: e.target.value },
      console.log(this.state)
    );
  }

  renderAddTokenButton() {
    let CT = ContractSectionList.CustomTokens;
    const { classes } = this.props;
    let dropdownConfig = {
      component: 'deployToken',
      selectClassName: 'send-from',
      selectName: 'from',
    };
    return (
      <React.Fragment>
        <div className="container row">
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={this.deployBinanceToken}
          >
            <AddIcon />
          </Fab>
          <h3 style={{ display: 'inline-block' }}>Deploy a ERC-20 token</h3>
          <div
            className="dapp-select-account send-from"
            style={{ display: 'inline-block', marginLeft: '20px' }}
          >
            <WalletDropdown
              dropdownConfig={dropdownConfig}
              returnDeployTokenAddress={this.returnDeployTokenAddress}
            />
          </div>
        </div>
        {/*}
        <button
          className={CT.buttonClass}
          onClick={() => this.props.displayModal('displayWatchToken')}
          style={{ float: 'left' }}
        >
          <div className="account-pattern">+</div>
          <h3>Deploy a ERC-20 token</h3>
        </button>
      */}
      </React.Fragment>
    );
  }

  // not snapshotted
  render() {
    return (
      <div className="contracts-view-custom-tokens">
        <TokenDescription />
        {this.renderAddTokenButton()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default compose(
  withStyles(styles, { name: 'CustomContracts' }),
  connect(
    mapStateToProps,
    { ...Actions }
  )
)(DeployToken);
