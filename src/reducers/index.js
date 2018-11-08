import { combineReducers } from 'redux';
import reducers from './reducers.js';
import web3Reducer from '../web3/web3Reducer';
import Web3Initializer from '../web3/Web3Initializer';

const appReducer = combineReducers({
  reducers: reducers,
  web3: web3Reducer,
  Web3Initializer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
