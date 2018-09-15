const initialState = {
  displayAlertMessage: false,
  alertKey: 'alert_20171104-hidden',
  peerCountIntervalId: null,
  currency: 'ETHER',
  totalBalance: 0.00,
  Wallets: {},
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
};

const reducers = (state = initialState, action) => {
	switch(action.type) {
		case 'UPDATE_EXCHANGE_RATES': {
			return {
				...state,
				exchangeRates: action.payload
			}
		}
		case  'UPDATE_ETHER_PRICES': {
			return {
				...state,
				prices: action.payload
			}
		}
		case  'SET_SELECTED_WALLET': {
			return {
				...state,
				selectedWallet: action.payload
			}
		}
		case 'SET_WALLETS': 
			return {
				...state,
				Wallets: Object.assign({}, state.Wallets, {[action.payload.account]: action.payload.balance})
			}
		case 'UPDATE_PROVIDER':
		return {
			...state,
			provider: action.payload
		}
		case 'UPDATE_BLOCKHEADER': 
			return {
				...state,
				blockHeader: action.payload
			}
		case 'UPDATE_PEERCOUNT': 
			return {
				...state,
				peerCount: action.payload
			}
		case 'UPDATE_CURRENCY_UNIT': 
			return {
				...state,
				currency: action.payload
			}
		case 'UPDATE_CONNECTED_NETWORK': 
			return {
				...state,
				network: action.payload
			}
		default:
			return state;
	}
}

export default reducers