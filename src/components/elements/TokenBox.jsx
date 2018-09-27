import React, { Component } from 'react';
import makeBlockie from 'ethereum-blockies-base64';

import { connect } from 'react-redux';
import { displayModal } from '../../actions/actions.js';

class TokenBox extends Component {
  constructor(props) {
    super(props);
    this.deleteTokenModal = this.deleteTokenModal.bind(this);
    console.log(this.props);
  }

  deleteTokenModal(e) {
    this.props.displayModal('displayDeleteToken');
  }

  render() {
    var GeoPattern = require('geopattern');
    var pattern = GeoPattern.generate('0x000', { color: '#CCC6C6' });
    let iconStyle = { backgroundImage: pattern.toDataUrl() };

    let token = this.props.token;
    console.log(token);
    const icon = makeBlockie(token.address);
    let divStyle = {
      backgroundImage: 'url(' + icon + ')',
    };
    return (
      <div className="wallet-box tokens" style={iconStyle}>
        <h3>{token.name}</h3>
        <button
          className="delete-token"
          style={divStyle}
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
  { displayModal }
)(TokenBox);
