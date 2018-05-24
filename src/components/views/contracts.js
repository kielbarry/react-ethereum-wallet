import React, { Component } from 'react'
import TokenBox from '../elements/tokenbox.js'

class Contracts extends Component {
	render() {
		return (
			<div className="dapp-container">


				<h1>{ "wallet.contracts.contractTitle" }</h1>

		        <a href="{pathFor route='deployContract'}" class="wallet-box create">
		            <div class="account-pattern">
		                +
		            </div>
		            <h3>{ "wallet.contracts.deployNewContract" }</h3>
		        </a> 


		        <h2>{ "wallet.contracts.customContracts" }</h2>

		        <p>{ "wallet.contracts.description" }</p>
		        <div class="dapp-clear-fix"></div>

		        <div class="wallet-box-list">
		        {
		        /*
		        {{#each customContracts}}
		            {{> elements_account account=_id isContract=true}}
		        {{/each}}
		    */}
		        </div>

		        <button class="wallet-box create add-contract">
		            <div class="account-pattern">
		                +
		            </div>
		            <h3>{ "wallet.contracts.addCustomContract" }</h3>
		        </button>  
		        <div class="dapp-clear-fix"></div>


		        <br></br>


				<TokenBox />

				<button class="wallet-box create add-token">
		            <div class="account-pattern">
		                +
		            </div>
		            <h3>{ "wallet.app.buttons.addToken" }</h3>
		        </button>   


			</div>
		);
	}
}

export default Contracts