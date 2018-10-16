import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import * as Actions from '../../actions/actions.js';

export class ContractActionBar extends Component {
  displayCopiedNotification(e) {
    e.preventDefault();
    this.props.displayGlobalNotification({
      display: true,
      type: 'info',
      msg: 'Copied to clipboad',
    });
  }

  displayAndSetQRCode(e) {
    this.props.updateQRCode(this.props.props.address);
    this.props.displayModal('displayQRCode');
  }

  displayAndSetJSON(e) {
    this.props.updateJSON(this.props.props.jsonInterface);
    this.props.displayModal('displayJSONInterface');
  }

  render() {
    let address = this.props.props.address;
    let transferEtherAddress = '/send/' + address;
    let etherScanAddress = 'https://etherscan.io/address/' + address;
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
            <li>
              <a href={etherScanAddress} target="noopener noreferrer _blank">
                <i className="icon-info" />
                View on Etherscan
              </a>
            </li>
            <CopyToClipboard text={address}>
              <li>
                <button
                  className="copy-to-clipboard-button"
                  onClick={e => this.displayCopiedNotification(e)}
                >
                  <i className="icon-docs" />
                  Copy address
                </button>
              </li>
            </CopyToClipboard>
            <li>
              <button
                className="qrcode-button"
                onClick={e => this.displayAndSetQRCode(e)}
              >
                <i className="icon-camera" />
                Show QR-Code
              </button>
            </li>
            <li>
              <button
                className="interface-button"
                onClick={e => this.displayAndSetJSON('displayJSONInterface')}
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
