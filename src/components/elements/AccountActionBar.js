import React, { Component } from 'react';
import { connect } from 'react-redux';

export class AccountActionBar extends Component {
	render() {
		console.log("AccountActionBar", this.props)

		let icons = [
			{
				className: "icon-arrow-down",
				href: ('/send/' + this.props.address),
				text: 'Transfer Ether &amp; Tokens',
			},
			{
				className: "icon-ethereum",
				href: '',
				text: 'Buy ether',
			},
			{
				className: "icon-info",
				href: ('https://etherscan.io/address/' + this.props.address),
				text: 'View on Etherscan',
			},
			{
				className: "icon-docs",
				secondClassName: '',
				href: '',
				text: 'Copy address',
			},
			{
				className: "icon-camera",
				secondClassName: '',
				href: '',
				text: 'Show QR-Code',
			},
		]

		return(
			<aside className="dapp-actionbar">
			  <nav>
			    <ul>
			      <li>
			        <a href="/send/0x6a6964034c192ccaA8594a179dB7a98ad581E4F2" title={ this.props.address }>
			          <i className="icon-arrow-down"></i>
			          Transfer Ether &amp; Tokens
			        </a>
			      </li>
			        <li>
			          <a href="https://changelly.com/widget/v1?auth=email&amp;from=USD&amp;to=ETH&amp;merchant_id=47f87f7cddda&amp;address=0xa7785988addb4457d5417691b88d2d99dc067284&amp;amount=1&amp;ref_id=e25c5a2e8719&amp;color=02a8f3" 
			          target="_blank">
			            <i className="icon-ethereum"></i>
			            Buy ether
			          </a>
			        </li>
			      <li>
			        <a href="https://etherscan.io/address/0x6a6964034c192ccaA8594a179dB7a98ad581E4F2" target="_blank">
			          <i className="icon-info"></i>
			          View on Etherscan
			        </a>
			      </li>
			      <li>
			        <button className="copy-to-clipboard-button">
			          <i className="icon-docs"></i>
			          Copy address
			        </button>
			      </li>
			      <li>
			        <button className="qrcode-button">
			          <i className="icon-camera"></i>
			          Show QR-Code
			        </button>
			      </li>
			    </ul>
			  </nav>
			</aside>
		);
	}
}
const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps)(AccountActionBar);
