import { combineReducers } from 'redux';
// import reducers from './reducers.js';
import reducers from './reducers.js';
import web3Reducer from '../web3/web3Reducer';

// export default combineReducers({
// 	reducers: reducers,
// })


const appReducer = combineReducers({
	reducers: reducers,
	web3: web3Reducer,
})

const rootReducer = (state, action) => {

  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;
