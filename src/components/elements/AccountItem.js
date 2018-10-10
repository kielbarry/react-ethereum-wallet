import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectedWallet } from '../../actions/actions.js';
import * as Utils from '../../utils/utils.js';
import SecurityIcon from './SecurityIcon.js';

class AccountItem extends Component {
  constructor(props) {
    super(props);
    this.openAccountPage = this.openAccountPage.bind(this);
  }

  openAccountPage(w) {
    this.props.selectedWallet({
      address: this.props.address,
      number: this.props.number,
      wallet: this.props.wallet,
      currency: this.props.props.reducers.currency,
      addressType: 'account',
    });
  }

  renderBalance() {
    let wallet = this.props.wallet;
    return (
      <React.Fragment>
        <span className="account-balance">
          {this.props.props.web3 && this.props.props.web3.web3Instance
            ? Utils.displayPriceFormatter(this.props.props, wallet)
            : wallet}
          <span> {this.props.props.reducers.currency} </span>
        </span>
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
            <i className="icon-key" title="Account" />
            Account {number}
          </h3>
          {this.renderBalance()}
          <span className="account-id">{address}</span>
        </Link>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { selectedWallet }
)(AccountItem);
