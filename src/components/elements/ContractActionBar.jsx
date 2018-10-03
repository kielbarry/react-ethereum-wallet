import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import * as Actions from '../../actions/actions.js';

export class ContractActionBar extends Component {
  render() {
    let address = this.props.props.address;
    let transferEtherAddress = '/send/' + address;
    return (
      <aside className="dapp-actionbar">
        <nav>
          <ul>
            <li>
              <a href={transferEtherAddress} title={address}>
                <i className="icon-arrow-down" />
                Transfer Ether &amp; Tokens
              </a>
            </li>
            <CopyToClipboard text={address}>
              <li>
                <button className="copy-to-clipboard-button">
                  <i className="icon-docs" />
                  Copy address
                </button>
              </li>
            </CopyToClipboard>
            <li>
              <button
                className="qrcode-button"
                onClick={e => this.props.displayModal('displayQRCode')}
              >
                <i className="icon-camera" />
                Show QR-Code
              </button>
            </li>
            <li>
              <button
                className="interface-button"
                onClick={e => this.props.displayModal('displayJSONInterface')}
              >
                <i className="icon-settings" />
                Show Interface
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(ContractActionBar);
