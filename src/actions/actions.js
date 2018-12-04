import { actionTypes } from './actionTypes.js';
// import io from 'socket.io-client';
// let socket = io('wss://streamer.cryptocompare.com')
import Web3 from 'web3';

// const web3 = new Web3('ws://127.0.0.1:8546');
const web3 = new Web3(
  'https://mainnet.infura.io/v3/2e1f7de617754b72a8a61bef3f7de966'
);

export const updateContractName = name => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_OBSERVED_CONTRACT_NAME,
    payload: name,
  });
};

export const updateWalletContractName = name => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_WALLET_CONTRACT_NAME,
    payload: name,
  });
};

export const updateAddressName = name => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_ADDRESS_NAME,
    payload: name,
  });
};

export const updateTokenToSend = tokenData => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_TOKEN_TO_SEND,
    payload: tokenData,
  });
};

export const updateContractTokenBalance = token => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_CONTRACT_TOKEN_BALANCE,
    payload: token,
  });
};

export const updateAccountTokenBalance = token => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_ACCOUNT_TOKEN_BALANCE,
    payload: token,
  });
};

export const setEthereumProviderConfig = data => dispatch => {
  dispatch({
    type: actionTypes.SET_ETHEREUM_PROVIDER_CONFIG,
    payload: data,
  });
};

export const updateWalletContracts = contract => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_WALLET_CONTRACT,
    payload: contract,
  });
  // TODO: data structs must match
  // dispatch({
  //   type: actionTypes.ADD_OBSERVED_CONTRACT,
  //   payload: contract,
  // });
  dispatch({
    type: actionTypes.DELETE_PENDING_CONTRACT,
    payload: contract.value.transactionHash,
  });
};

export const updatePendingContracts = hash => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_PENDING_CONTRACTS,
    payload: hash,
  });
};

export const updateInitialDeployedContractMethodOutputs = outputs => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_INITIAL_DEPLOYED_CONTRACT_METHOD_OUTPUTS,
    payload: outputs,
  });
};

export const updateInitialObservedContractMethodOutputs = outputs => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_INITIAL_OBSERVED_CONTRACT_METHOD_OUTPUTS,
    payload: outputs,
  });
};

export const updateFunctionInput = input => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_FUNCTION_INPUT,
    payload: input,
  });
};

export const updateExecutingWallet = address => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_EXECUTING_WALLET,
    payload: address,
  });
};

export const emptySelectedFunction = func => dispatch => {
  dispatch({
    type: actionTypes.EMPTY_SELECTED_FUNCTION,
    payload: func,
  });
};

export const updateSelectedFunction = func => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_SELECTED_FUNCTION,
    payload: func,
  });
};

export const updateJSON = json => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_JSON_INTERFACE,
    payload: json,
  });
};

export const updateQRCode = address => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_QR_CODE,
    payload: address,
  });
};

export const updateSelectedEvent = event => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_SELECTED_EVENT,
    payload: event,
  });
};

export const addDeployedContractFunctions = funcs => dispatch => {
  dispatch({
    type: actionTypes.ADD_DEPLOYED_CONTRACT_FUNCTIONS,
    payload: funcs,
  });
};

export const addDeployedContractConstants = consts => dispatch => {
  dispatch({
    type: actionTypes.ADD_DEPLOYED_CONTRACT_CONSTANTS,
    payload: consts,
  });
};

export const addObservedContractFunctions = funcs => dispatch => {
  dispatch({
    type: actionTypes.ADD_OBSERVED_CONTRACT_FUNCTIONS,
    payload: funcs,
  });
};

export const addObservedContractConstants = consts => dispatch => {
  dispatch({
    type: actionTypes.ADD_OBSERVED_CONTRACT_CONSTANTS,
    payload: consts,
  });
};
export const updateContractLog = newLog => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_PAST_CONTRACT_LOGS,
    payload: newLog,
  });
};

export const addPastContractLogs = contractWithLogs => dispatch => {
  dispatch({
    type: actionTypes.ADD_PAST_CONTRACT_LOGS,
    payload: contractWithLogs,
  });
};

export const fetchTokensForAutoScan = accounts => {
  const requestTokens = accounts => {
    return {
      type: actionTypes.REQUEST_TOKENS_AUTOSCAN,
      payload: accounts,
    };
  };
  const receiveTokens = tokens => {
    return {
      type: actionTypes.RECEIVE_GAS_AUTOSCAN,
      payload: tokens,
    };
  };
  const updateBalanceChecked = num => {
    return {
      type: actionTypes.UPDATE_BALANCE_CHECKED,
      payload: num,
    };
  };
  const updateErrChecked = num => {
    return {
      type: actionTypes.UPDATE_ERR_CHECKED,
      payload: num,
    };
  };
  return dispatch => {
    dispatch(requestTokens(accounts));
    let tokenListURL =
      'https://raw.githubusercontent.com/MyEtherWallet/ethereum-lists/master/dist/tokens/eth/tokens-eth.json';

    return fetch(tokenListURL)
      .then(
        response => response.json(),
        error => {
          console.warn('An error occurred in fetchTokensForAutoScan', error);
          dispatch(
            displayGlobalNotification({
              display: true,
              type: 'error',
              msg: 'There was an error scanning tokens for autoscan',
              duration: 5,
            })
          );
        }
      )
      .then(async tokens => {
        let balancesChecked = 0;
        let errChecked = 0;
        tokens.map(token => {
          accounts.map(account => {
            // let web3 = new Web3('ws://127.0.0.1:8546');

            // balanceOf(address)
            const callData =
              '0x70a08231000000000000000000000000' +
              account.substring(2).replace(' ', '');

            async function sendTransactionPromise(params) {
              return new Promise((resolve, reject) => {
                web3.eth
                  .call({
                    to: token.address.replace(' ', ''),
                    data: callData,
                  })
                  .then(result => {
                    dispatch(updateBalanceChecked((balancesChecked += 1)));
                    const tokenAmt = web3.utils.toBN(result);

                    const tokenAmtInEther = web3.utils.fromWei(
                      tokenAmt,
                      'ether'
                    );

                    // TODO along with the rest of this action.
                    // not token name, changing/changed to token address
                    // if (!tokenAmt.isZero()) {
                    dispatch(
                      addObservedToken({
                        name: token.name,
                        value: Object.assign({}, token, {
                          amount: web3.utils.fromWei(tokenAmt, 'ether'),
                        }),
                      })
                    );
                    // }

                    return null;
                  })
                  .catch(function(error) {
                    console.error(error);
                    dispatch(updateErrChecked((errChecked += 1)));
                    errChecked += 1;
                  });
              });
            }

            sendTransactionPromise();

            // console.log(yield call(sendTransactionPromise, sendParams))
            // tx = yield call(sendTransactionPromise, sendParams);

            // const promise = new Promise(web3.eth.call({
            //   to: token.address.replace(' ', ''),
            //   data: callData
            // }))
            // // console.log(promise)
            // let tokenArray = web3.eth.call({
            //   to: token.address.replace(' ', ''),
            //   data: callData
            // })
            // .then((result) => {
            //   console.log(result)
            //   dispatch(updateBalanceChecked(balancesChecked += 1));
            //   const tokenAmt = web3.utils.toBN(result);
            //   return null;
            // })
            // .catch(function(error) {
            //   console.error(error);
            //   dispatch(updateErrChecked(errChecked += 1));
            //   errChecked += 1;
            //   // this.displayGlobalNotification({
            //   //   display: true,
            //   //   type: 'error',
            //   //   msg: 'There was an error tokens for autoscan during a web3 call',
            //   //   duration: 5,
            //   // });
            // });
          });
        });
        // dispatch(receiveTokens(tokens));
      });
  };
};

export const updateMainDCF = data => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_MAIN_DCF,
    payload: data,
  });
};

export const updateDCFRadio = data => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_DCF_RADIO,
    payload: data,
  });
};

export const updateMainContractAddress = data => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_MAIN_CONTRACT_ADDRESS,
    payload: data,
  });
};

export const updateDeployContractForm = data => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_DEPLOY_CONTRACT_FORM,
    payload: data,
  });
};

export const updateSelectedTransaction = tx => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_SELECTED_TRANSACTION,
    payload: tx,
  });
};

export const clearTransactionToSend = () => dispatch => {
  dispatch({
    type: actionTypes.CLEAR_TRANSACTION_TO_SEND,
  });
};

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
        error => {
          console.warn('An error occurred.', error);
          this.displayGlobalNotification({
            display: true,
            type: 'error',
            msg: 'There was an error fetching gas stats',
            duration: 5,
          });
        }
      )
      .then(jsonGasStats => {
        dispatch(receiveGas(jsonGasStats));
      });
  };
};

export const emptySelectedContract = empty => dispatch => {
  dispatch({
    type: actionTypes.EMPTY_SELECTED_CONTRACT,
    payload: empty,
  });
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

export const emptySelectedWallet = empty => dispatch => {
  dispatch({
    type: actionTypes.EMPTY_SELECTED_WALLET,
    payload: empty,
  });
};

export const selectedWallet = wallet => dispatch => {
  dispatch({
    type: actionTypes.SET_SELECTED_WALLET,
    payload: wallet,
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
    type: actionTypes.UPDATE_CONNECTED_NETWORK,
    payload: network,
  });
};
