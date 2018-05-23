import React, { Component } from 'react'
import '../stylesheets/mergedstyles.css'

class SelectableUnit extends Component {
	
	render() {
		/**
		The available units

		@property selectableUnits
		*/
		var selectableUnits = [{
			    text: 'ETHER',
			    value: 'ether'
			},
			{
			    text: 'FINNEY', //(µΞ)
			    value: 'finney'
			},
			{
			    text: 'BTC',
			    value: 'btc'
			},
			{
			    text: 'USD',
			    value: 'usd'
			},
			{
			    text: 'EUR',
			    value: 'eur'
			},
			{
			    text: 'GBP',
			    value: 'gbp'
			},
			{
			    text: 'BRL',
			    value: 'brl'
			}];

		return (
			<div className="simple-modal">
				<ul>
					 { 
					 	Object.keys(selectableUnits).map((item, i) => {
					 		const t =  selectableUnits[item].text
					 		const v =  selectableUnits[item].value
					 		var k = t + i
					 		console.log(k)
							return (
								<li data-key="{ k }">
									<button data-value={ v }> 
										{ t } 
									</button> 
								</li>)
						})
					 }
				</ul>
			</div>
		)
	}
}

export default SelectableUnit