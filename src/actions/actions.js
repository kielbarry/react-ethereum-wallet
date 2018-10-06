import { actionTypes } from './actionTypes.js';
// import io from 'socket.io-client';
// let socket = io('wss://streamer.cryptocompare.com')

export const updateTransactionConfirmation = cn => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_TRANSACTION_CONFIRMATION,
    payload: cn,
  });
};

export const updateTransaction = txnInfo => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_TRANSACTION,
    payload: txnInfo,
  });
};

export const addTransaction = txHash => dispatch => {
  dispatch({
    type: actionTypes.ADD_TRANSACTION,
    payload: txHash,
  });
};

export const displayGlobalNotification = msg => dispatch => {
  dispatch({
    type: actionTypes.DISPLAY_GLOBAL_NOTIFICATION,
    payload: msg,
  });
};

export const updateTransactionToSend = tx => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_TRANSACTION_TO_SEND,
    payload: tx,
  });
};

export const fetchEthGasStationStats = gasStats => {
  const requestGas = gasStats => {
    return {
      type: actionTypes.REQUEST_GAS_STATS,
      payload: gasStats,
    };
  };
  const receiveGas = jsonGasStats => {
    return {
      type: actionTypes.RECEIVE_GAS_STATS,
      payload: jsonGasStats,
    };
  };
  return dispatch => {
    dispatch(requestGas(gasStats));
    return fetch('https://ethgasstation.info/json/ethgasAPI.json')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(jsonGasStats => {
        console.log;
        dispatch(receiveGas(jsonGasStats));
      });
  };
};

export const selectedContract = contract => dispatch => {
  dispatch({
    type: actionTypes.SET_SELECTED_CONTRACT,
    payload: contract,
  });
};

export const tokenToDelete = token => dispatch => {
  dispatch({
    type: actionTypes.SET_TOKEN_TO_DELETE,
    payload: token,
  });
};

export const deleteToken = token => dispatch => {
  dispatch({
    type: actionTypes.DELETE_TOKEN,
    payload: token,
  });
};

export const addObservedToken = token => dispatch => {
  dispatch({
    type: actionTypes.ADD_OBSERVED_TOKEN,
    payload: token,
  });
};

export const cancelTokenToWatch = () => dispatch => {
  dispatch({
    type: actionTypes.CANCEL_TOKEN_TO_WATCH,
    payload: '',
  });
};

export const updateTokenToWatch = tokenInfo => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_TOKEN_TO_WATCH,
    payload: tokenInfo,
  });
};

export const addObservedContract = contract => dispatch => {
  dispatch({
    type: actionTypes.ADD_OBSERVED_CONTRACT,
    payload: contract,
  });
};

export const cancelContractToWatch = () => dispatch => {
  dispatch({
    type: actionTypes.CANCEL_CONTRACT_TO_WATCH,
    payload: '',
  });
};

export const updateContractToWatch = contractInfo => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_CONTRACT_TO_WATCH,
    payload: contractInfo,
  });
};

export const closeModal = modalName => dispatch => {
  dispatch({
    type: actionTypes.CLOSE_MODAL,
    payload: modalName,
  });
};

export const displayModal = modalName => dispatch => {
  dispatch({
    type: actionTypes.DISPLAY_MODAL,
    payload: modalName,
  });
};

export const createInitWalletContract = wc => dispatch => {
  dispatch({
    type: actionTypes.CREATE_INIT_WALLET_CONTRACT,
    payload: wc,
  });
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
    payload: value,
  });
};

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
