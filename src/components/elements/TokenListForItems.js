import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import shortid from 'shortid';

import { selectedWallet } from '../../actions/actions.js';
import * as Utils from '../../utils/utils.js';
import * as Actions from '../../actions/actions.js';
import NumberFormat from 'react-number-format';

import { tokenInterface } from '../../constants/TokenInterfaceConstant.js';

import { Identicon } from 'ethereum-react-components';

export class TokenListForItems extends Component {
  constructor(props) {
    super(props);
  }

  getTokenBalanceForAddress(untrackedTokens) {
    let walletAddress = this.props.address;
    let ObservedTokens = this.props.ObservedTokens;

    // if observedTokens Empty
    // or if no tokens in walletaddress
    // then return
    if (ObservedTokens)
      if (!this.props.web3 || !this.props.web3.web3Instance) {
        return;
      }

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
              this.props.updateContractTokenBalance({
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

    let currentObservedTokens = new Set(Object.keys(this.props.ObservedTokens));

    let tokenCheck;

    //TODO: should extract this javascript into separate function
    // returns null html
    if (this.props.addressType === 'Wallets') {
      tokenCheck = this.props.Wallets[address].tokens;
    } else if (this.props.addressType === 'WalletContracts') {
      tokenCheck = this.props.WalletContracts[address].tokens;
    } else {
      return null;
    }

    let currentWalletsTokens = tokenCheck ? tokenCheck : [];

    if (
      currentObservedTokens !== undefined &&
      currentWalletsTokens !== undefined &&
      tokenCheck !== undefined
    ) {
      let trackedTokens = new Set(Object.keys(currentWalletsTokens));
      let untrackedTokens = Array.from(
        new Set([...currentObservedTokens].filter(x => !trackedTokens.has(x)))
      );
      this.getTokenBalanceForAddress(untrackedTokens);
    }

    let tokens = tokenCheck;
    console.log('renders countAmount / walletContracts+wallets ', tokens);

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
                <Identicon
                  classes="dapp-identicon dapp-tiny"
                  title
                  size="tiny"
                  seed={tokens[token].address}
                />
              </li>
            ))}
      </ul>
    );
  }
}

// const mapStateToProps = state => {
//   return state;
// };

const mapStateToProps = state => ({
  ObservedTokens: state.reducers.ObservedTokens,
  Wallets: state.reducers.Wallets,
  WalletContracts: state.reducers.WalletContracts,
});

export default connect(
  mapStateToProps,
  { ...Actions }
)(TokenListForItems);
