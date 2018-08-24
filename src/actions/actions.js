import { actionTypes } from './actionTypes.js';
import io from 'socket.io-client';

let socket = io('wss://streamer.cryptocompare.com')


export const cryptocompareConnected = (connection) => dispatch => { 
	console.log(connection)
	dispatch({
		type: actionTypes.CRYPTO_COMPARE_CONNECTED,
		payload: connection,
	})
}

// socket
// 	.on('connect', cryptocompareConnected('connect'))
// 	.on('disconnect', cryptocompareConnected('disconnect'))
// 	.on('connecting', cryptocompareConnected('connecting'))
// 	.on('disconnecting', cryptocompareConnected('disconnecting'))
// 	.on('error', cryptocompareConnected('error'))

// export const cryptocompareConnected = (connection) => dispatch => { 
// 	console.log(connection)
// 	dispatch({
// 		type: actionTypes.CRYPTO_COMPARE_CONNECTED,
// 		payload: connection,
// 	})
// }

export const updateEtherPrices = () => dispatch => {
	console.log(socket)
// io.on('connect', (res) => console.log);


	// return (...args) => {
	// 	const result = actionCreator.apply(this, args)
	// 	console.log(...args, result)
	// 	socket.emit(result.key, {
	// 		...result.payload,
	// 	})
	// 	return result;
	// }
}

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

