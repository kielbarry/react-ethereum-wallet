import React, { Component } from 'react';
import { connect } from 'react-redux';

import AccountActionBar from '../elements/AccountActionBar.js';

export class SingleAccountView extends Component {

	render(){
		let sw
		if(!this.props.reducers.selectedWallet === undefined) {
			sw = this.props.reducers.selectedWallet
		} else {
			sw = {
				address: "0x6a6964034c192ccaA8594a179dB7a98ad581E4F2",
				number: 4,
				wallet: "1000000000000000",
				currency: "ETHER",
			}
		}
		return(
			<div className="dapp-container accounts-page">
				<div className="dapp-sticky-bar dapp-container"></div>
				<div className="accounts-page-summary">
					<span className="dapp-identicon"
	        title="This is a security icon.  If there were any change to the address, the resulting icon would be a completely different one"
	        />
	        <header>
		        <h1>
		            <span>Account { sw.number }</span>
		            <em className="edit-name">Account { sw.number }</em>
		            <i className="edit-icon icon-pencil"></i>
		        </h1>
		        <h2 className="copyable-address">
		        	<i className="icon-key" title="Account"></i>
		          <span>{ sw.address }</span>
		        </h2>
		        <div className="clear"></div>
		        <span className="account-balance">
		        	{ sw.wallet }
			        <span className="inline-form" name="unit">
                <button type="button" data-name="unit" data-value={ sw.currency }>
                    { sw.currency }
                </button>
					    </span>
					  </span>
		        {/* Account infos */}
		        <div className="account-info">
		        	<h3>NOTE </h3>
		            <p>Accounts can't display incoming transactions, but can receive, hold and send Ether. To see incoming transactions create a wallet contract to store ether.</p>
		            <p>If your balance doesn't seem updated, make sure that you are in sync with the network.</p>
		        </div>
		      </header>
			  </div>
		    <AccountActionBar props={ sw }/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps)(SingleAccountView);

// <h2 class="copyable-address">{{walletIcon}}
//             <!-- <input type="text" value="{{toChecksumAddress address}}" readonly class=""> -->
//             <span>{{toChecksumAddress address}}</span>
//         </h2>
//         <div class="clear"></div>
//         {{> elements_balance balance=balance changeUnit=true showAllDecimals=true}}


