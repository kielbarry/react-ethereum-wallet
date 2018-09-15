import { combineReducers } from 'redux';
import reducers from './reducers.js';
import web3Reducer from '../web3/web3Reducer';

const appReducer = combineReducers({
	reducers: reducers,
	web3: web3Reducer,
});

const rootReducer = (state, action) => {
	if (action.type === 'USER_LOGOUT') {
		state = undefined;
	}
	return appReducer(state, action);
};

export default rootReducer;
