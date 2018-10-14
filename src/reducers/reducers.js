const initialState = {
  displayAlertMessage: false,
  alertKey: 'alert_20171104-hidden',
  peerCountIntervalId: null,
  currency: 'ETHER',
  totalBalance: 0.0,
  Wallets: {},
  ObservedContracts: {},
  ObservedTokens: {},
  CustomContracts: {},
  Transactions: {},
  PendingConfirmations: {},
  Events: {},
  Tokens: {},
  peerCount: 0,
  blockHeader: 0,
  timeSinceLastBlock: 0,
  network: '',
  provider: '',
  modals: {
    displayWatchContract: false,
    displayWatchToken: false,
    displayDeleteToken: false,
    displaySendTransaction: false,
    displayTransaction: false,
    displayJSONInterface: false,
    displayQRCode: false,
  },
  ContractToWatch: {},
  TokenToWatch: {},
  TokenToDelete: '',
  GasStats: {},
  TransactionToSend: {},
  globalNotification: {
    display: false,
  },
  DeployContractForm: {
    simpleChecked: true,
    multisigChecked: false,
    importwalletChecked: false,
    multiSigContract: {
      ownerCount: 3,
      confirmationAddressesRequired: 1,
      dailyLimitAmount: 10,
    },
  },
  balancesAutoScanChecked: 0,
  errorsAutoScanReceived: 0,
};

const reducers = (state = initialState, action) => {
  if (action.type === 'ADD_PAST_CONTRACT_LOGS') {
    console.log('here in reducers', action.payload);
  }
  switch (action.type) {
    case 'UPDATE_PAST_CONTRACT_LOGS':
      return {
        ...state,
        ObservedContracts: {
          ...state.ObservedContracts,
          [action.payload.address]: {
            ...state.ObservedContracts[action.payload.address],
            logs: [
              ...state.ObservedContracts[action.payload.address]['logs'],
              action.payload,
            ],
          },
        },
      };
    case 'ADD_PAST_CONTRACT_LOGS':
      return {
        ...state,
        ObservedContracts: Object.assign({}, state.ObservedContracts, {
          [action.payload.address]: action.payload,
        }),
      };
    case 'UPDATE_BALANCE_CHECKED':
      return {
        ...state,
        balancesAutoScanChecked: action.payload,
      };
    case 'UPDATE_ERR_CHECKED':
      return {
        ...state,
        errorsAutoScanReceived: action.payload,
      };
    case 'UPDATE_DCF_RADIO':
      return {
        ...state,
        DeployContractForm: Object.assign(
          {},
          state.DeployContractForm,
          action.payload
        ),
      };
    case 'UPDATE_DEPLOY_CONTRACT_FORM':
      return {
        ...state,
        DeployContractForm: {
          ...state.DeployContractForm,
          multiSigContract: {
            ...action.payload,
          },
        },
      };
    case 'UPDATE_SELECTED_TRANSACTION':
      return {
        ...state,
        SelectedTransaction: action.payload,
      };
    case 'CLEAR_TRANSACTION_TO_SEND':
      return {
        ...state,
        TransactionToSend: {},
      };
    case 'UPDATE_TRANSACTION_CONFIRMATION':
      return {
        ...state,
        Transactions: {
          ...state.Transactions,
          [action.payload.name]: {
            ...state.Transactions[action.payload.name],
            confirmationNumber: action.payload.value,
          },
        },
      };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        Transactions: {
          ...state.Transactions,
          [action.payload.name]: {
            ...state.Transactions[action.payload.name],
            ...action.payload.value,
          },
        },
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        Transactions: Object.assign({}, state.Transactions, {
          [action.payload.hash]: action.payload.value,
        }),
      };
    case 'DISPLAY_GLOBAL_NOTIFICATION':
      return {
        ...state,
        globalNotification: Object.assign(
          {},
          state.globalNotification,
          action.payload
        ),
      };
    case 'UPDATE_TRANSACTION_TO_SEND':
      return {
        ...state,
        TransactionToSend: Object.assign({}, state.TransactionToSend, {
          [action.payload.name]: action.payload.value,
        }),
      };
    // case RECEIVED_GAS_ERROR:
    case 'RECEIVE_GAS_STATS':
      return {
        ...state,
        GasStats: Object.assign({}, action.payload),
      };
    case 'SET_SELECTED_CONTRACT':
      return {
        ...state,
        selectedContract: action.payload,
      };
    case 'SET_TOKEN_TO_DELETE':
      return {
        ...state,
        TokenToDelete: action.payload,
      };
    case 'DELETE_TOKEN':
      return {
        ...state,
        ObservedTokens: Object.assign(
          {},
          ...Object.entries(state.ObservedTokens)
            .filter(([k]) => k !== action.payload)
            .map(([k, v]) => ({ [k]: v }))
        ),
        TokenToDelete: '',
      };
    case 'ADD_OBSERVED_TOKEN':
      return {
        ...state,
        ObservedTokens: Object.assign({}, state.ObservedTokens, {
          [action.payload.name]: action.payload.value,
        }),
      };
    case 'CANCEL_TOKEN_TO_WATCH':
      return {
        ...state,
        TokenToWatch: {},
      };
    case 'UPDATE_TOKEN_TO_WATCH':
      return {
        ...state,
        TokenToWatch: Object.assign({}, state.TokenToWatch, {
          [action.payload.name]: action.payload.value,
        }),
      };
    case 'ADD_OBSERVED_CONTRACT':
      return {
        ...state,
        ObservedContracts: Object.assign(
          {},
          state.ObservedContracts,
          action.payload
        ),
      };
    case 'CANCEL_CONTRACT_TO_WATCH':
      return {
        ...state,
        ContractToWatch: {},
      };
    case 'UPDATE_CONTRACT_TO_WATCH':
      return {
        ...state,
        ContractToWatch: Object.assign({}, state.ContractToWatch, {
          [action.payload.name]: action.payload.value,
        }),
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modals: Object.assign({}, ...state.modals, {
          [action.payload]: false,
        }),
      };
    case 'DISPLAY_MODAL':
      return {
        ...state,
        modals: Object.assign({}, ...state.modals, {
          [action.payload]: true,
        }),
      };
    case 'CREATE_INIT_WALLET_CONTRACT':
      return {
        ...state,
        Wallet: action.payload,
      };
    case 'UPDATE_EXCHANGE_RATES':
      return {
        ...state,
        exchangeRates: action.payload,
      };
    case 'UPDATE_ETHER_PRICES':
      return {
        ...state,
        prices: action.payload,
      };
    case 'SET_SELECTED_WALLET':
      return {
        ...state,
        selectedWallet: action.payload,
      };
    case 'UPDATE_DISPLAY_VALUE':
      return {
        ...state,
        displayValue: action.payload,
      };
    case 'UPDATE_TOTAL_BALANCE':
      return {
        ...state,
        totalBalance: action.payload,
      };
    case 'SET_WALLETS':
      return {
        ...state,
        Wallets: Object.assign({}, state.Wallets, {
          [action.payload.account]: action.payload.balance,
        }),
      };
    case 'UPDATE_PROVIDER':
      return {
        ...state,
        provider: action.payload,
      };
    case 'UPDATE_BLOCKHEADER':
      return {
        ...state,
        blockHeader: action.payload,
      };
    case 'UPDATE_PEERCOUNT':
      return {
        ...state,
        peerCount: action.payload,
      };
    case 'UPDATE_CURRENCY_UNIT':
      return {
        ...state,
        currency: action.payload,
      };
    case 'UPDATE_CONNECTED_NETWORK':
      return {
        ...state,
        network: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
