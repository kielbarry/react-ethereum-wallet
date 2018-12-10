import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectedWallet } from '../../actions/actions.js';
import * as Utils from '../../utils/utils.js';
import * as Actions from '../../actions/actions.js';
import NumberFormat from 'react-number-format';
import TokenListForItems from './TokenListForItems.js';
import { EthAddress, Identicon } from 'ethereum-react-components';

export class AccountItem extends Component {
  constructor(props) {
    super(props);
    this.openAccountPage = this.openAccountPage.bind(this);
  }

  openAccountPage(w) {
    this.props.selectedWallet({
      address: this.props.address,
      number: this.props.number,
      wallet: this.props.wallet,
      currency: this.props.reducers.currency,
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
        <span> {this.props.reducers.currency} </span>
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
            seed={this.props.address}
          />
          <TokenListForItems
            addressType={this.props.addressType}
            address={this.props.address}
          />
          {this.renderName()}
          {this.renderBalance()}
          <EthAddress short classes="account-id" address={address} />
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
  { selectedWallet, ...Actions }
)(AccountItem);
