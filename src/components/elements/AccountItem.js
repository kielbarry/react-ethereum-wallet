import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectedWallet } from '../../actions/actions.js';
import * as Utils from '../../utils/utils.js';
import * as Actions from '../../actions/actions.js';
import SecurityIcon from './SecurityIcon.js';
import NumberFormat from 'react-number-format';

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

  render() {
    let address = this.props.address;
    let number = this.props.number;
    const AccountURL = '/account/' + address;
    return (
      <React.Fragment>
        <Link
          to={{ pathname: AccountURL }}
          onClick={this.openAccountPage}
          className="wallet-box"
        >
          <SecurityIcon
            type="accountItem"
            classes="dapp-identicon dapp-small"
            hash={this.props.address}
          />
          <ul className="token-list" />
          <h3 className="not-ens-name">
            <i className={this.props.icon} title="Account" />
            Account {number}
          </h3>
          {this.renderBalance()}
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
  { selectedWallet, ...Actions }
)(AccountItem);
