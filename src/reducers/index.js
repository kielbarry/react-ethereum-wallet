import { combineReducers } from 'redux';
import reducers from './reducers.js';

// export default combineReducers({
// 	reducers: reducers,
// })


const appReducer = combineReducers({
	reducers: reducers,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;
