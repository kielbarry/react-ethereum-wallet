import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectedWallet } from '../../actions/actions.js';
import { displayPriceFormatter } from '../../utils/utils.js';
import NumberFormat from 'react-number-format';
import TokenListForItems from './TokenListForItems.js';
import { EthAddress, Identicon } from 'ethereum-react-components';

export class AccountItem extends Component {
  constructor(props) {
    super(props);
    this.openAccountPage = this.openAccountPage.bind(this);
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (this.props.wallet !== prevProps.wallet) {
      return true;
    }
    if (this.props.currency !== prevProps.currency) {
      return true;
    }
    if (
      this.props.reducers.exchangeRates !== prevProps.reducers.exchangeRates
    ) {
      return true;
    }
    return false;
  }

  openAccountPage(w) {
    this.props.selectedWallet({
      address: this.props.address,
      number: this.props.number,
      wallet: this.props.wallet,
      currency: this.props.currency,
      addressType: 'account',
    });
  }

  renderBalance() {
    let wallet = this.props.wallet;
    return (
      <React.Fragment>
        <NumberFormat
          className="account-balance"
          value={displayPriceFormatter(this.props, wallet.balance)}
          displayType={'text'}
          thousandSeparator={true}
        />
        <span> {this.props.currency} </span>
      </React.Fragment>
    );
  }

  renderTokens() {
    let ot = this.props.ObservedTokens;
    let tokenList = this.props.wallet.tokens;
    let displayTokens =
      (Object.keys(ot).length !== 0 && ot.constructor === Object) ||
      tokenList !== undefined;
    return (
      <React.Fragment>
        {displayTokens ? (
          <TokenListForItems
            addressType={this.props.addressType}
            address={this.props.address}
          />
        ) : null}
      </React.Fragment>
    );
  }

  renderName() {
    let number = this.props.number;
    let name = this.props.wallet.name;
    return (
      <h3 className="not-ens-name">
        <i className={this.props.icon} title="Account" />
        &nbsp;
        {!name ? 'Account ' + number : name}
      </h3>
    );
  }

  render() {
    let address = this.props.address;
    const AccountURL = '/account/' + address;

    return (
      <React.Fragment>
        <Link
          to={{ pathname: AccountURL }}
          onClick={this.openAccountPage}
          className="wallet-box"
        >
          <Identicon
            classes="dapp-identicon dapp-small"
            title
            size="small"
            address={this.props.address}
          />
          {this.renderTokens()}
          {this.renderName()}
          {this.renderBalance()}
          <EthAddress short classes="account-id" address={address} />
        </Link>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { selectedWallet }
)(AccountItem);
