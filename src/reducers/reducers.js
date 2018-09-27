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
  },
  ContractToWatch: {},
  TokenToWatch: {},
  TokenToDelete: '',
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN_TO_DELETE': {
      return {
        ...state,
        TokenToDelete: action.payload,
      };
    }
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
