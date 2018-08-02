import { actionTypes } from './actionTypes.js';

export const updateCurrency = ({ CurrencyUnit }) => dispatch => {
	dispatch({
		type: actionTypes.UPDATE_CURRENCY_UNIT,
		payload: CurrencyUnit,
	})
}

export function updateConnectedNetwork() {

	return window.web3.eth.net.getNetworkType().then(network => {
		return {
			type: 'UPDATE_CONNECTED_NETWORK',
			payload: network
		}
	});

  // return {
  //   type: actionTypes.UPDATE_CONNECTED_NETWORK;
  // };
}
