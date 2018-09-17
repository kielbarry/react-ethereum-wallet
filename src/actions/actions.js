import { actionTypes } from './actionTypes.js';
// import io from 'socket.io-client';
// let socket = io('wss://streamer.cryptocompare.com')

export const createInitWalletContract = (wc) => dispatch => {
	dispatch({
		type: actionTypes.CREATE_INIT_WALLET_CONTRACT,
		payload: wc
	})
}

export const createCryptoCompareSocket = () => dispatch => {
	// 	let socket = io('wss://streamer.cryptocompare.com')
	// 	socket.on('connect', () => {
	// 		dispatch({
	// 			type: actionTypes.CRYPTO_COMPARE_CONNECTED,
	// 			payload: socket.connected,
	// 		})
	// 	})
	// 	var subscription = [
	// 		'5~CCCAGG~ETH~USD',
	// 		// '5~CCCAGG~ETH~BTC',
	// 		// '5~CCCAGG~ETH~EUR',
	// 		// '5~CCCAGG~ETH~GBP',
	// 		// '5~CCCAGG~ETH~BRL',
	// 	];
	// 	socket.emit('SubAdd', { subs: subscription });
	// 	socket.on("m", function(message) {
	// 		var messageType = parseInt(message.substring(0, message.indexOf("~")));
	// 		if (messageType == 5) {
	// 			dataUnpack(message);
	// 		}
	// 	});
	// 	socket.on('disconnect', () => {
	// 		dispatch({
	// 			type: actionTypes.CRYPTO_COMPARE_CONNECTED,
	// 			payload: socket.connected,
	// 		})
	// 	})
};

export const updateEtherPrices = exchangeRates => dispatch => {
	dispatch({
		type: actionTypes.UPDATE_EXCHANGE_RATES,
		payload: exchangeRates,
	});
};

export const selectedWallet = wallet => dispatch => {
	dispatch({
		type: actionTypes.SET_SELECTED_WALLET,
		payload: wallet,
	});
};

export const updateDisplayValue = value => dispatch => {
	dispatch({
		type: actionTypes.UPDATE_DISPLAY_VALUE,
		payload: value
	});
}

export const updateTotalBalance = totalBalance => dispatch => {
	dispatch({
		type: actionTypes.UPDATE_TOTAL_BALANCE,
		payload: totalBalance,
	});
};

export const setWallets = Wallets => dispatch => {
	dispatch({
		type: actionTypes.SET_WALLETS,
		payload: Wallets,
	});
};

export const updateProvider = provider => dispatch => {
	dispatch({
		type: actionTypes.UPDATE_PROVIDER,
		payload: provider,
	});
};

export const updateBlockHeader = blockHeader => dispatch => {
	dispatch({
		type: actionTypes.UPDATE_BLOCKHEADER,
		payload: blockHeader,
	});
};

export const updatePeerCount = PeerCount => dispatch => {
	dispatch({
		type: actionTypes.UPDATE_PEERCOUNT,
		payload: PeerCount,
	});
};

export const updateCurrency = ({ CurrencyUnit }) => dispatch => {
	dispatch({
		type: actionTypes.UPDATE_CURRENCY_UNIT,
		payload: CurrencyUnit,
	});
};

export const updateConnectedNetwork = network => dispatch => {
	dispatch({
		type: 'UPDATE_CONNECTED_NETWORK',
		payload: network,
	});
};
