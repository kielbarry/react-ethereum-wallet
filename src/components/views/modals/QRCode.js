import React, { Component } from 'react';

class QRCode extends Component {
  render() {
    var QRCode = require('qrcode.react');
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    return (
      <div className={this.props.display} style={divStyle}>
        <section className="dapp-modal-container">
          <p />
          <p>
            <div id="qrcode">
              <QRCode value={this.props.hash} />
            </div>
          </p>
          <p />
          <p> Point a compatible mobile app to this code </p>
        </section>
      </div>
    );
  }
}

export default QRCode;
