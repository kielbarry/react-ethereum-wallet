import React, { Component } from 'react'

class AddCustomContract extends Component {
	render() {
		return (
			<div>
			    <h1>{ "wallet.contracts.addCustomContract" }</h1>
			    <h3>{ "wallet.contracts.address" }</h3>
			    {{> dapp_addressInput placeholder="0x000000.."
			     value=this.address name="address" class='contract-address'}}
			    <h3>{ "wallet.contracts.name" }</h3>
			    <input type="string" value="" name="name" 
			    placeholder="Name this contract" class="name">
			    <h3>{ "wallet.contracts.jsonInterface" }</h3>
			    <textarea name="jsonInterface" class="jsonInterface" 
			    placeholder='[{type: "constructor", name: "MyContract", 
			    "inputs":[{"name":"_param1", "type":"address"}]}, {...}]' 
			    cols="30" rows="10"></textarea>
		    </div>
		)
	}
}

export default AddCustomContract