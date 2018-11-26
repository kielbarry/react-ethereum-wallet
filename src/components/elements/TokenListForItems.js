import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import shortid from 'shortid';

import { selectedWallet } from '../../actions/actions.js';
import * as Utils from '../../utils/utils.js';
import * as Actions from '../../actions/actions.js';
// import SecurityIcon from './SecurityIcon.js';
import { SecurityIcon } from './SecurityIcon.js';
import NumberFormat from 'react-number-format';

import { tokenInterface } from '../../constants/TokenInterfaceConstant.js';

export class TokenListForItems extends Component {
  constructor(props) {
    super(props);
  }

  getTokenBalanceForAddress(untrackedTokens) {
    let walletAddress = this.props.address;
    let ObservedTokens = this.props.reducers.ObservedTokens;

    if (!this.props.web3 || !this.props.web3.web3Instance) {
      return;
    }

    console.log(walletAddress);
    console.log(ObservedTokens);

    untrackedTokens.map(tokenAddress => {
      let web3 = this.props.web3.web3Instance;
      let TokenContract = new web3.eth.Contract(tokenInterface);
      TokenContract.options.address = tokenAddress;

      try {
        TokenContract.methods
          .balanceOf(walletAddress)
          .call()
          .then(result => {
            if (result == 0) {
              return;
            }
            console.log(
              'result of retrieving token balance. check sepecifically for wallet contracts',
              result
            );
            let tokenResult = ObservedTokens[tokenAddress];
            tokenResult['balance'] = result;

            if (this.props.addressType === 'Wallets') {
              this.props.updateAccountTokenBalance({
                account: walletAddress,
                value: tokenResult,
                tokenAddress: tokenAddress,
              });
              return;
            }
            if (this.props.addressType === 'WalletContracts') {
              this.props.updateAccountTokenBalance({
                account: walletAddress,
                value: tokenResult,
                tokenAddress: tokenAddress,
              });
              return;
            }
          });
      } catch (err) {
        console.warn('Err :', err);
        this.props.displayGlobalNotification({
          display: true,
          type: 'error',
          msg: err.message,
        });
      }
    });
  }

  render() {
    let address = this.props.address;

    let currentObservedTokens = new Set(
      Object.keys(this.props.reducers.ObservedTokens)
    );

    let tokenCheck;

    if (this.props.addressType === 'Wallets') {
      tokenCheck = this.props.reducers.Wallets[address].tokens;
    } else if (this.props.addressType === 'WalletContracts') {
      tokenCheck = this.props.reducers.WalletContracts[address].tokens;
    } else {
      return;
    }

    let currentWalletsTokens = tokenCheck ? tokenCheck : [];

    // console.log(currentWalletsTokens)
    console.log('the current observed TOkens', currentObservedTokens);
    console.log(currentWalletsTokens);
    if (
      currentObservedTokens !== undefined &&
      currentWalletsTokens !== undefined
    ) {
      let trackedTokens = new Set(Object.keys(currentWalletsTokens));
      let untrackedTokens = Array.from(
        new Set([...currentObservedTokens].filter(x => !trackedTokens.has(x)))
      );
      console.log('here inside', untrackedTokens);
      this.getTokenBalanceForAddress(untrackedTokens);
    }

    let tokens = tokenCheck;

    return (
      <ul className="token-list">
        {tokens === undefined
          ? null
          : Object.keys(tokens).map(token => (
              <li
                key={shortid.generate()}
                data-tooltip={
                  tokens[token].name +
                  ' (' +
                  tokens[token].balance +
                  ' ' +
                  tokens[token].symbol +
                  ')'
                }
                className="simptip-position-right simptip-movable"
              >
                <SecurityIcon
                  type="accountItem"
                  classes="dapp-identicon dapp-tiny"
                  hash={tokens[token].address}
                />
              </li>
            ))}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(TokenListForItems);
