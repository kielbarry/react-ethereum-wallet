import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectedWallet } from '../../actions/actions.js';
import * as Utils from '../../utils/utils.js';
// import * as Actions from '../../actions/actions.js';
import NumberFormat from 'react-number-format';
import TokenListForItems from './TokenListForItems.js';
import { EthAddress, Identicon } from 'ethereum-react-components';

// import shortid from 'shortid';

export const Balance = props => {
  let wallet = props.wallet;
  return (
    <React.Fragment>
      {props.web3 && props.web3.web3Instance ? (
        <NumberFormat
          className="account-balance"
          value={Utils.displayPriceFormatter(props, wallet.balance)}
          displayType={'text'}
          thousandSeparator={true}
        />
      ) : (
        <NumberFormat
          className="account-balance"
          value={wallet.balance}
          displayType={'text'}
          thousandSeparator={true}
        />
      )}
      <span> {props.currency} </span>
    </React.Fragment>
  );
};

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
        {this.props.web3 && this.props.web3.web3Instance ? (
          <NumberFormat
            className="account-balance"
            value={Utils.displayPriceFormatter(this.props, wallet.balance)}
            displayType={'text'}
            thousandSeparator={true}
          />
        ) : (
          <NumberFormat
            className="account-balance"
            value={wallet.balance}
            displayType={'text'}
            thousandSeparator={true}
          />
        )}
        <span> {this.props.currency} </span>
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

    let ot = this.props.ObservedTokens;
    let tokenList = this.props.wallet.tokens;

    let displayTokens =
      (Object.keys(ot).length !== 0 && ot.constructor === Object) ||
      tokenList !== undefined;

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
            seed={this.props.address}
          />
          {displayTokens ? (
            <TokenListForItems
              addressType={this.props.addressType}
              address={this.props.address}
            />
          ) : null}

          {this.renderName()}

          {/*}
          <Balance 
            key={shortid.generate()}
            reducers={this.props.reducers}
            wallet={this.props.wallet}
            web3={this.props.web3}
            currency={this.props.currency}
          />
          */}

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
