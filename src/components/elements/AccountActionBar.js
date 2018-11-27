import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as Actions from '../../actions/actions.js';

const ListItem = (props) => {
  return(
    <li>
      <a href={props.href} title={props.title} target="noopener noreferrer _blank">
        <i className={props.icon} />
        {props.text}
      </a>
    </li>
  )
}

export class AccountActionBar extends Component {
  shouldComponentUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      return true;
    }
    return false;
  }

  displayCopiedNotification(e) {
    e.preventDefault();
    this.props.displayGlobalNotification({
      display: true,
      type: 'info',
      msg: 'Copied to clipboad',
    });
  }

  displayAndSetQRCode(e) {
    this.props.updateQRCode(this.props.wallet.address);
    this.props.displayModal('displayQRCode');
  }

  render() {
    let address = this.props.wallet.address;
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
            <ListItem href={transferEtherAddress} title={address} 
            icon="icon-arrow-down" text=" Transfer Ether &amp; Tokens"/>
            <ListItem href={changellyAddress} title="" icon="icon-ethereum" text="Buy ether"/>
            <ListItem href={etherScanAddress} icon="icon-info" text="View on Etherscan"/>
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
