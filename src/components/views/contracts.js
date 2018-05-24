import React, { Component } from 'react'
import TokenBox from '../elements/tokenbox.js'

class Contracts extends Component {
	render() {
		return (
			<div className="dapp-container">


				<h1>{ "wallet.contracts.contractTitle" }</h1>

		        <a href="{pathFor route='deployContract'}" className="wallet-box create">
		            <div className="account-pattern">
		                +
		            </div>
		            <h3>{ "wallet.contracts.deployNewContract" }</h3>
		        </a> 


		        <h2>{ "wallet.contracts.customContracts" }</h2>

		        <p>{ "wallet.contracts.description" }</p>
		        <div className="dapp-clear-fix"></div>

		        <div className="wallet-box-list">
		        {
		        /*
		        {{#each customContracts}}
		            {{> elements_account account=_id isContract=true}}
		        {{/each}}
		    */}
		        </div>

		        <button className="wallet-box create add-contract">
		            <div className="account-pattern">
		                +
		            </div>
		            <h3>{ "wallet.contracts.addCustomContract" }</h3>
		        </button>  
		        <div className="dapp-clear-fix"></div>


		        <br></br>


				<TokenBox />

				<button className="wallet-box create add-token">
		            <div className="account-pattern">
		                +
		            </div>
		            <h3>{ "wallet.app.buttons.addToken" }</h3>
		        </button>   


			</div>
		);
	}
}

export default Contracts