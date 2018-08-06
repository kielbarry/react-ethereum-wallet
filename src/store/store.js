import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducers';

const initialState = {
      displayAlertMessage: false,
      alertKey: 'alert_20171104-hidden',
      peerCountIntervalId: null,
      currency: 'ETHER',
    };

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