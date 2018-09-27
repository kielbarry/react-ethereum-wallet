import React, { Component } from 'react';
import makeBlockie from 'ethereum-blockies-base64';

class TokenBox extends Component {
  render() {
    console.log(this.props);

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
        <button className="delete-token" style={divStyle}>
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

export default TokenBox;
