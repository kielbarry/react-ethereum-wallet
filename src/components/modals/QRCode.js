import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/actions.js';

class QRCode extends Component {
  shouldComponentUpdate(prevProps, prevState) {
    if (
      this.props.display !== prevProps.display ||
      this.props.hash !== prevProps.hash
    ) {
      return true;
    }
    return false;
  }

  closeModal(e) {
    e.preventDefault();
    if (e.target.getAttribute('id') === 'qrCode') {
      this.props.closeModal('displayQRCode');
    }
  }
  render() {
    var QRCode = require('qrcode.react');
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    return (
      <div
        className={this.props.display}
        style={divStyle}
        onClick={e => this.closeModal(e)}
        id="qrCode"
      >
        <section className="dapp-modal-container">
          <p />
          {/*<p>*/}
          <div id="qrcode">
            <QRCode value={this.props.hash} />
          </div>
          {/*</p>*/}
          <p />
          <p> Point a compatible mobile app to this code </p>
        </section>
      </div>
    );
  }
}

export default connect(
  null,
  { ...Actions }
)(QRCode);
