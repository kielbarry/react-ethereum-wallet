import React, { Component } from 'react';
import '../stylesheets/navbar.css'
import '../stylesheets/mergedstyles.css'

class NavBar extends Component {
  render() {
    return (
		<header className="dapp-header dapp-full-header">
			<nav>
				<ul>
					<li>
						<a href="/">
							<i className="icon-wallet"></i>
							<span>Wallets</span>
						</a>
					</li>
					<li>
						<a href="/send-from">
							<i className="icon-arrow-up"></i>
							<span>Send</span>
						</a>
					</li>
					<li className="block-info dapp-flex-item">
							<i className="icon-feed"></i>
							<span>peers</span>
							<i className="icon-layers"></i>

							<span className="hide-on-small">since last block</span>
					</li>
					<li>
						<a href="/contracts">
							<i className="icon-docs"></i>
							<span>Wallets</span>
						</a>
					</li>
					<li className="wallet-balance">
						<h3>Balance</h3>
						<span className="account-balance">
							<span className="inline-form" name="unit">
								<button type="button" data-name="unit" data-value="ether">ETHER</button>
							</span>
						</span>
					</li>
				</ul>
			</nav>
		</header>
    );
  }
}

export default NavBar;