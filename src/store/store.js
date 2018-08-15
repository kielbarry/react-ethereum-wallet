import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';

// const initialState = {
//   displayAlertMessage: false,
//   alertKey: 'alert_20171104-hidden',
//   peerCountIntervalId: null,
//   currency: 'ETHER',
//   totalBalance: 0.00,
//   Wallets: {},
//   CustomContracts: {},
//   Transactions: {},
//   PendingConfirmations: {},
//   Events: {},
//   Tokens: {},
//   web3Instance: null,
// };

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  // initialState,
  compose(
  	applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
 );

export default store;