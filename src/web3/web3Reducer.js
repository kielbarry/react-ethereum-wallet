// const initialState = {
//   web3Instance: null
// }

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
  web3Instance: null,
};

const web3Reducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED') {
    return Object.assign({}, state, {
      web3Instance: action.payload.web3Instance
    })
  }

  return state
}

export default web3Reducer
