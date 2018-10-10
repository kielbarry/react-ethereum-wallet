import React, { Component } from 'react';
import { connect } from 'react-redux';
import { displayModal, tokenToDelete } from '../../actions/actions.js';
import SecurityIcon from './SecurityIcon.js';

class TokenBox extends Component {
  constructor(props) {
    super(props);
    this.deleteTokenModal = this.deleteTokenModal.bind(this);
  }

  deleteTokenModal(e) {
    this.props.tokenToDelete(this.props.token.name);
    this.props.displayModal('displayDeleteToken');
  }

  render() {
    var GeoPattern = require('geopattern');
    var pattern = GeoPattern.generate('0x000', { color: '#CCC6C6' });
    let iconStyle = { backgroundImage: pattern.toDataUrl() };
    let token = this.props.token;
    return (
      <div className="wallet-box tokens" style={iconStyle}>
        <SecurityIcon
          type="tokenBox"
          classes="dapp-identicon dapp-small"
          hash={token.address}
        />
        <h3>{token.name}</h3>
        <button
          className="delete-token"
          onClick={e => this.deleteTokenModal(e)}
        >
          <i className="icon-trash" />
        </button>
        <span className="account-balance">
          {token.balance}
          <span>{token.symbol}</span>
        </span>
        <span className="account-id">{token.address}</span>
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
