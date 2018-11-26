import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectedContract } from '../../actions/actions.js';
import SecurityIcon from './SecurityIcon.js';
import * as Utils from '../../utils/utils.js';
import * as Actions from '../../actions/actions.js';
import NumberFormat from 'react-number-format';

import { tokenInterface } from '../../constants/TokenInterfaceConstant.js';

import TokenListForItems from './TokenListForItems.js';

class ContractItem extends Component {
  constructor(props) {
    super(props);
    this.openAccountPage = this.openAccountPage.bind(this);
    this.makeID = this.makeID.bind(this);

    this.state = {
      fakeAddress: this.makeID(),
    };
    this.fakeAddressInterval = setInterval(() => {
      this.setState({
        fakeAddress: this.makeID(),
      });
    }, 50);
  }

  componentWillUnmount() {
    clearInterval(this.fakeAddressInterval);
  }

  openAccountPage(e) {
    this.props.selectedContract({
      contract: this.props.contract,
      currency: this.props.reducers.currency,
      exchangeRates: this.props.reducers.exchangeRates,
      addressType: 'contract',
    });
  }

  getTokenBalanceForAddress(untrackedTokens) {
    let walletAddress = this.props.address;
    let ObservedTokens = this.props.reducers.ObservedTokens;

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
            console.log(result);
            let tokenResult = ObservedTokens[tokenAddress];
            tokenResult['balance'] = result;

            this.props.updateAccountTokenBalance({
              account: walletAddress,
              value: tokenResult,
              tokenAddress: tokenAddress,
            });
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

  // renderTokens() {
  //   let address = this.props.address;

  //   let currentObservedTokens = new Set(
  //     Object.keys(this.props.reducers.ObservedTokens)
  //   );
  //   let tokenCheck = this.props.reducers.Wallets[address].tokens;
  //   let currentWalletsTokens = tokenCheck ? tokenCheck : [];

  //   if (
  //     currentObservedTokens !== undefined &&
  //     currentWalletsTokens !== undefined
  //   ) {
  //     let trackedTokens = new Set(Object.keys(currentWalletsTokens));
  //     let untrackedTokens = Array.from(
  //       new Set([...currentObservedTokens].filter(x => !trackedTokens.has(x)))
  //     );
  //     this.getTokenBalanceForAddress(untrackedTokens);
  //   }

  //   let tokens = tokenCheck;

  //   return (
  //     <ul className="token-list">
  //       {tokens === undefined
  //         ? null
  //         : Object.keys(tokens).map(token => (
  //             <li
  //               data-tooltip={
  //                 tokens[token].name +
  //                 ' (' +
  //                 tokens[token].balance +
  //                 ' ' +
  //                 tokens[token].symbol +
  //                 ')'
  //               }
  //               className="simptip-position-right simptip-movable"
  //             >
  //               <SecurityIcon
  //                 type="accountItem"
  //                 classes="dapp-identicon dapp-tiny"
  //                 hash={tokens[token].address}
  //               />
  //             </li>
  //           ))}
  //     </ul>
  //   );
  // }

  //snapshotted
  renderBalance() {
    let contract = this.props.contract;
    return (
      <React.Fragment>
        {this.props.web3 && this.props.web3.web3Instance ? (
          <NumberFormat
            className="account-balance"
            value={Utils.displayPriceFormatter(this.props, contract.balance)}
            displayType={'text'}
            thousandSeparator={true}
          />
        ) : (
          <NumberFormat
            className="account-balance"
            value={contract.balance}
            displayType={'text'}
            thousandSeparator={true}
          />
        )}
        <span> {this.props.reducers.currency} </span>
      </React.Fragment>
    );
  }

  makeID() {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  //snapshotted
  renderPendingProgress() {
    let percent = this.props.contract.confirmationNumber / 12;
    return (
      <div className="dapp-progress">
        <div className="dapp-bar" style={{ width: { percent } + '%' }} />
      </div>
    );
  }

  renderPendingSecurityIcon() {
    return (
      <React.Fragment>
        <SecurityIcon
          type="contractItem"
          classes={'dapp-identicon dapp-small dapp-icon-loading'}
          hash={this.state.fakeAddress}
        />
      </React.Fragment>
    );
  }

  renderPending() {
    return (
      <React.Fragment>
        {this.renderPendingProgress()}
        {this.renderPendingSecurityIcon()}
      </React.Fragment>
    );
  }

  renderName() {
    let contract = this.props.contract;
    let pending = this.props.pending;
    console.log(contract);

    pending ? (pending = true) : (pending = false);
    return (
      <React.Fragment>
        {
          // !pending
          //   ? (<TokenListForItems
          //       addressType="WalletContracts"
          //       address={contract.contractAddress}
          //     />)
          //   : null
        }
        <h3 className="not-ens-name">
          <i className="icon-eye" />
          &nbsp;
          {!pending
            ? contract['contract-name'] === undefined
              ? 'UNNAMED'
              : contract['contract-name']
            : 'UNNAMED'}
        </h3>
      </React.Fragment>
    );
  }

  renderCreating() {
    return (
      <React.Fragment>
        <span className="account-balance">
          Creating
          <span>...</span>
        </span>
        <span className="account-id creating" />
      </React.Fragment>
    );
  }

  render() {
    let contract = this.props.contract;
    let pending = this.props.pending;

    pending ? (pending = true) : (pending = false);

    // eslint-disable-next-line
    Object.keys(contract).length === 0 && contract.constructor === Object
      ? (pending = true)
      : null;

    let address;
    // eslint-disable-next-line
    !pending ? (address = contract.contractAddress) : null;

    let ContractUrl = '/contract/';
    // eslint-disable-next-line
    !pending ? (ContractUrl += address) : null;

    // eslint-disable-next-line
    !pending ? clearInterval(this.fakeAddressInterval) : null;

    return (
      <React.Fragment>
        <Link
          to={{ pathname: ContractUrl }}
          onClick={e => this.openAccountPage(e)}
          className={!pending ? 'wallet-box' : 'wallet-box creating wallets'}
        >
          {!pending ? (
            <SecurityIcon
              type="contractItem"
              classes={'dapp-identicon dapp-small dapp-icon-loading'}
              hash={address}
            />
          ) : (
            this.renderPending()
          )}
          {this.renderName()}
          {!pending ? this.renderBalance() : this.renderCreating()}
          <span className="account-id">{address}</span>
        </Link>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { selectedContract, ...Actions }
)(ContractItem);
