import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import shortid from 'shortid';

import NumberFormat from 'react-number-format';
import { Identicon } from 'ethereum-react-components';
import { selectedWallet } from '../../actions/actions';
import * as Utils from '../../utils/utils';
import * as Actions from '../../actions/actions';

import { tokenInterface } from '../../constants/TokenInterfaceConstant';

export class TokenListForItems extends Component {
  constructor(props) {
    super(props);
  }

  getTokenBalanceForAddress(untrackedTokens) {
    const walletAddress = this.props.address;
    const ObservedTokens = this.props.ObservedTokens;

    // if observedTokens Empty
    // or if no tokens in walletaddress
    // then return
    if (ObservedTokens) {
      untrackedTokens.map(tokenAddress => {
        const web3 = this.props.web3.web3Instance;
        const TokenContract = new web3.eth.Contract(tokenInterface);
        TokenContract.options.address = tokenAddress;

        try {
          TokenContract.methods
            .balanceOf(walletAddress)
            .call()
            .then(result => {
              if (result == 0) {
                return;
              }

              const tokenResult = ObservedTokens[tokenAddress];
              tokenResult.balance = result;

              if (this.props.addressType === 'Wallets') {
                this.props.updateAccountTokenBalance({
                  account: walletAddress,
                  value: tokenResult,
                  tokenAddress,
                });
                return;
              }
              if (this.props.addressType === 'WalletContracts') {
                this.props.updateContractTokenBalance({
                  account: walletAddress,
                  value: tokenResult,
                  tokenAddress,
                });
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
  }

  render() {
    const address = this.props.address;

    const currentObservedTokens = new Set(
      Object.keys(this.props.ObservedTokens)
    );
    // console.log(currentObservedTokens);

    let tokenCheck;

    // TODO: should extract this javascript into separate function
    // returns null html
    // console.log(this.props.addressType);
    if (this.props.addressType === 'Wallets') {
      tokenCheck = this.props.Wallets[address].tokens;
    } else if (this.props.addressType === 'WalletContracts') {
      tokenCheck = this.props.WalletContracts[address].tokens;
    } else {
      return null;
    }

    const currentWalletsTokens = tokenCheck || [];

    // console.log(currentObservedTokens);
    // console.log(currentWalletsTokens);
    // console.log(tokenCheck);

    if (
      // currentObservedTokens !== undefined || currentWalletsTokens !== undefined
      // &&
      tokenCheck !== undefined
    ) {
      const trackedTokens = new Set(Object.keys(currentWalletsTokens));
      // console.log(trackedTokens);
      const untrackedTokens = Array.from(
        new Set([...currentObservedTokens].filter(x => !trackedTokens.has(x)))
      );
      // console.log(untrackedTokens);
      this.getTokenBalanceForAddress(untrackedTokens);
    }

    const tokens = tokenCheck;
    // console.log('renders countAmount / walletContracts+wallets ', tokens);

    return (
      <ul className="token-list">
        {tokens === undefined
          ? null
          : Object.keys(tokens).map(token => (
              <li
                key={shortid.generate()}
                data-tooltip={`${tokens[token].name} (${
                  tokens[token].balance
                } ${tokens[token].symbol})`}
                className="simptip-position-right simptip-movable"
              >
                <Identicon
                  classes="dapp-identicon dapp-tiny"
                  title
                  size="tiny"
                  address={tokens[token].address}
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
