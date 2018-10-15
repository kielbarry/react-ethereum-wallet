import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as Actions from '../../actions/actions.js';

export class AccountActionBar extends Component {
  shouldComponentUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      return true;
    }
    return false;
  }

  displayAndSetQRCode(e) {
    this.props.updateQRCode(this.props.props.address);
    this.props.displayModal('displayQRCode');
  }

  render() {
    let address = this.props.props.address;
    let etherScanAddress = 'https://etherscan.io/address/' + address;
    let transferEtherAddress = '/send/' + address;
    let changellyAddress =
      'https://changelly.com/widget/v1?auth=email&amp;from=USD&amp;to=ETH&amp;merchant_id=47f87f7cddda&amp;address=' +
      address +
      '&amp;amount=1&amp;ref_id=e25c5a2e8719&amp;color=02a8f3';

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
              <a href={changellyAddress} target="noopener noreferrer _blank">
                <i className="icon-ethereum" />
                Buy ether
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
                <button className="copy-to-clipboard-button">
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
)(AccountActionBar);
