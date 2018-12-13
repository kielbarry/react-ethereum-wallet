import React, { Component } from 'react';
import { connect } from 'react-redux';
import { displayModal, tokenToDelete } from '../../actions/actions.js';

import { tokenInterface } from '../../constants/TokenInterfaceConstant.js';

import { makeID } from '../../utils/helperFunctions.js';

import { EthAddress, Identicon } from 'ethereum-react-components';

export class TokenBox extends Component {
  constructor(props) {
    super(props);
    this.invokeContractMethod = this.invokeContractMethod.bind(this);
    this.deleteTokenModal = this.deleteTokenModal.bind(this);
  }

  deleteTokenModal(e) {
    this.props.tokenToDelete(this.props.token);
    this.props.displayModal('displayDeleteToken');
  }

  renderBalance() {
    let token = this.props.token;
    return (
      <span className="account-balance">
        {token.totalSupply}
        <span>{token.symbol}</span>
      </span>
    );
  }

  render() {
    var GeoPattern = require('geopattern');
    var pattern = GeoPattern.generate('0x000', { color: '#CCC6C6' });
    let iconStyle = { backgroundImage: pattern.toDataUrl() };
    let token = this.props.token;

    let address =
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
