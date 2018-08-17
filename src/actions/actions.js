import { actionTypes } from './actionTypes.js';

export const setWallets = ( Wallets ) => dispatch => {
	dispatch({
		type: actionTypes.SET_WALLETS,
		payload: Wallets,
	})
}

export const updateBlockHeader = ( blockHeader ) => dispatch => {
	dispatch({
		type: actionTypes.UPDATE_BLOCKHEADER,
		payload: blockHeader,
	})
}

export const updatePeerCount = ( PeerCount ) => dispatch => {
	dispatch({
		type: actionTypes.UPDATE_PEERCOUNT,
		payload: PeerCount,
	})
}

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
