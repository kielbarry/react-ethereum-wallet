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
  // web3Instance: null,
};


const reducers = (state = initialState, action) => {
	switch(action.type) {
		case 'UPDATE_PEERCOUNT_UNIT': 
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