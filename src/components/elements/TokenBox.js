import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EthAddress, Identicon } from 'ethereum-react-components';
import { displayModal, tokenToDelete } from '../../actions/actions';

import { tokenInterface } from '../../constants/TokenInterfaceConstant';

import { makeID } from '../../utils/helperFunctions';

export class TokenBox extends Component {
  constructor(props) {
    super(props);
    this.deleteTokenModal = this.deleteTokenModal.bind(this);
  }

  deleteTokenModal(e) {
    this.props.tokenToDelete(this.props.token);
    this.props.displayModal('displayDeleteToken');
  }

  renderBalance() {
    const token = this.props.token;
    return (
      <span className="account-balance">
        {token.totalSupply}
        <span>{token.symbol}</span>
      </span>
    );
  }

  render() {
    const GeoPattern = require('geopattern');
    const pattern = GeoPattern.generate('0x000', { color: '#CCC6C6' });
    const iconStyle = { backgroundImage: pattern.toDataUrl() };
    const token = this.props.token;

    const address =
      token === {} || token.address === '' ? makeID() : token.address;

    return (
      <div className="wallet-box tokens" style={iconStyle}>
        <Identicon
          classes="dapp-identicon dapp-small"
          title
          size="small"
          address={address}
        />
        <h3>{token.name}</h3>
        <button
          className="delete-token"
          onClick={e => this.deleteTokenModal(e)}
        >
          <i className="icon-trash" />
        </button>
        {this.renderBalance()}
        <EthAddress short classes="account-id" address={address} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { displayModal, tokenToDelete }
)(TokenBox);
