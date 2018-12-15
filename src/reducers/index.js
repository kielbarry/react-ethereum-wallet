import { combineReducers } from 'redux';
import reducers from './reducers';

const appReducer = combineReducers({
  reducers,
});

const rootReducer = (state, action) => {
  let updatedState = state;
  if (action.type === 'USER_LOGOUT') {
    updatedState = undefined;
  }
  return appReducer(updatedState, action);
};

export default rootReducer;
