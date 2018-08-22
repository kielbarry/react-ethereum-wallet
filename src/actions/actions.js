import { actionTypes } from './actionTypes.js';

export const selectedWallet = ( wallet ) => dispatch => {
	dispatch({
		type: actionTypes.SET_SELECTED_WALLET,
		payload: wallet,
	})
}

export const setWallets = ( Wallets ) => dispatch => {
	dispatch({
		type: actionTypes.SET_WALLETS,
		payload: Wallets,
	})
}

export const updateProvider = ( provider ) => dispatch => {
	dispatch({
		type: actionTypes.UPDATE_PROVIDER,
		payload: provider,
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

export const updateConnectedNetwork = ( network ) => dispatch => {
	dispatch({
		type: 'UPDATE_CONNECTED_NETWORK',
		payload: network
	})
}

