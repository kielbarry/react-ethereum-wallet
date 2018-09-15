import { actionTypes } from './actionTypes.js';
// import io from 'socket.io-client';

// let socket = io('wss://streamer.cryptocompare.com')

export const setLanguage = () => dispatch => {
	try {

	} catch(err)  {

	}
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


// 	var currentPrice = {};
// 	const FIELDS = {
//       'T': 0x0 // hex for binary 0, it is a special case of fields that are always there TYPE
//   ,   'M': 0x0 // hex for binary 0, it is a special case of fields that are always there MARKET
//   ,   'FSYM': 0x0 // hex for binary 0, it is a special case of fields that are always there FROM SYMBOL
//   ,   'TSYM': 0x0 // hex for binary 0, it is a special case of fields that are always there TO SYMBOL
//   ,   'F': 0x0 // hex for binary 0, it is a special case of fields that are always there FLAGS
//   ,   'ID': 0x1 // hex for binary 1                                                       ID
//   ,   'TS': 0x2 // hex for binary 10                                                      TIMESTAMP
//   ,   'Q': 0x4 // hex for binary 100                                                     QUANTITY
//   ,   'P': 0x8 // hex for binary 1000                                                    PRICE
//   ,   'TOTAL': 0x10 // hex for binary 10000                                                   TOTAL
// };
// 	const unpack = function(value) {
// 	  var valuesArray = value.split("~");
// 	  var valuesArrayLenght = valuesArray.length;
// 	  var mask = valuesArray[valuesArrayLenght - 1];
// 	  var maskInt = parseInt(mask, 16);
// 	  var unpackedCurrent = {};
// 	  var currentField = 0;
// 	  for (var property in FIELDS) {
// 	  	// console.log(valuesArray)
// 	  	console.log(property)
// 	  	console.log(FIELDS[property])
// 	  	// console.log(maskInt)
// 	  	 if (FIELDS[property] == 1) {
// 	  	 	console.log(valuesArray[currentField])
// 	  	 }
// 	    if (FIELDS[property] == 0) {
// 	    	// console.log("here")
// 	      unpackedCurrent[property] = valuesArray[currentField];
// 	      currentField++;
// 	    }
// 	    else if (maskInt & FIELDS[property]) {
// 	      //i know this is a hack, for cccagg, future code please don't hate me:(, i did this to avoid
// 	      //subscribing to trades as well in order to show the last market
// 	      if (property === 'LASTMARKET') {
// 	      	// console.log('this is lastmarket')
// 	        unpackedCurrent[property] = valuesArray[currentField];
// 	      }
// 	      else {
// 	        unpackedCurrent[property] = parseFloat(valuesArray[currentField]);
// 	      }
// 	      currentField++;
// 	    }
// 	  }

// 	  return unpackedCurrent;
// 	};


// 	var dataUnpack = function(message) {
// 		var data = unpack(message);

// 		console.log(data)

// 		var from = data['FROMSYMBOL'];
// 		var to = data['TOSYMBOL'];
// 		// var fsym = CCC.STATIC.CURRENCY.getSymbol(from);
// 		// var tsym = CCC.STATIC.CURRENCY.getSymbol(to);
// 		var pair = from + to;

// 		if (!currentPrice.hasOwnProperty(pair)) {
// 			currentPrice[pair] = {};
// 		}

// 		for (var key in data) {
// 			currentPrice[pair][key] = data[key];
// 		}

// 		if (currentPrice[pair]['LASTTRADEID']) {
// 			currentPrice[pair]['LASTTRADEID'] = parseInt(currentPrice[pair]['LASTTRADEID']).toFixed(0);
// 		}
// 		// displayData(currentPrice[pair], from, tsym, fsym);
// 		console.log(currentPrice)
// 	};



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
}

export const cryptocompareConnected = (connection) => dispatch => { 
	// console.log(connection)
	// console.log(actionTypes.CRYPTO_COMPARE_CONNECTED)
	// dispatch({
	// 	type: actionTypes.CRYPTO_COMPARE_CONNECTED,
	// 	payload: connection,
	// })
}

export const updateEtherPrices = (exchangeRates) => dispatch => {
	console.log(exchangeRates)
	dispatch({
		type: actionTypes.UPDATE_EXCHANGE_RATES,
		payload: exchangeRates
	})
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

