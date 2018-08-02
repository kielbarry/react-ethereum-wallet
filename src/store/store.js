import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducers';

const initialState = {};

const middlewares = [thunk];


const store = createStore(
  rootReducer,
  initialState,
  compose(
	applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
 );

export default store;