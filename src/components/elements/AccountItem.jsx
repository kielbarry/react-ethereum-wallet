import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectedWallet } from '../../actions/actions.js';

import makeBlockie from 'ethereum-blockies-base64';

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
    });
  }

  render() {
    let address = this.props.address;
    let number = this.props.number;
    let wallet = this.props.wallet;
    const AccountURL = '/account/' + address;
    const icon = makeBlockie(this.props.address);
    let divStyle = {
      backgroundImage: 'url(' + icon + ')',
    };
    return (
      <React.Fragment>
        <Link
          to={{ pathname: AccountURL }}
          onClick={this.openAccountPage}
          className="wallet-box"
        >
          <span
            className="dapp-identicon dapp-small"
            title="This is a security icon.  If there were any change to the address, 
          the resulting icon would be a completely different one"
            src={icon}
            style={divStyle}
          >
            <img
              src={icon}
              style={divStyle}
              className="identicon-pixel"
              alt=""
            />
          </span>
          <ul className="token-list" />
          <h3 className="not-ens-name">
            <i className="icon-key" title="Account" />
            Account {number}
          </h3>

          <span className="account-balance">
            {wallet}
            <span> ether </span>
          </span>
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
