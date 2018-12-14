import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { EthAddress, Identicon } from 'ethereum-react-components';
import { selectedWallet } from '../../actions/actions';
import { displayPriceFormatter } from '../../utils/utils';
import TokenListForItems from './TokenListForItems';

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
    const wallet = this.props.wallet;
    return (
      <React.Fragment>
        <NumberFormat
          className="account-balance"
          value={displayPriceFormatter(this.props, wallet.balance)}
          displayType="text"
          thousandSeparator
        />
        <span> {this.props.currency} </span>
      </React.Fragment>
    );
  }

  renderTokens() {
    const ot = this.props.ObservedTokens;
    const tokenList = this.props.wallet.tokens;
    const displayTokens =
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
    const number = this.props.number;
    const name = this.props.wallet.name;
    return (
      <h3 className="not-ens-name">
        <i className={this.props.icon} title="Account" />
        &nbsp;
        {!name ? `Account ${number}` : name}
      </h3>
    );
  }

  render() {
    const address = this.props.address;
    const AccountURL = `/account/${address}`;

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
