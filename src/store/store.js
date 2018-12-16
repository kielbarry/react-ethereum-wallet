import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from '../reducers';

const middlewares = [thunk];

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'reducers.selectedFunction',
    'reducers.TransactionToSend',
    'reducers.network',
    'reducers.provider',
    'reducers.blockHeader',
    'reducers.timeSinceLastBlock',
    'reducers.peerCount',
    'reducers.modals',
    'reducers.DeployContractForm',
    'reducers.SelectedTransction',
    'reducers.SelectedWallet',
    'reducers.SelectedEvent',
  ],
};

// const isChrome = window.navigator.userAgent.includes('Chrome');

export default function configureStore() {
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    persistReducer(persistConfig, rootReducer),
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  /* eslint-enable */

  persistStore(store);

  return store;
}
