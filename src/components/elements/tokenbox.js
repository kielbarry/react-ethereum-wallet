import React, { Component } from 'react'

class TokenBox extends Component {
	render() {
		return (
			<div>
				<h2>{ "wallet.tokens.title" }</h2>
		        <p> { "wallet.tokens.description" } </p>
		        <div className="dapp-clear-fix"></div>

				<div className="wallet-box-list">
				here in wallet box
				{/*
		        {{#each tokens}}
		            {{> elements_tokenBox}}
		        {{/each}}
				*/}
		        </div>
	        </div>
		);
	}
}

export default TokenBox