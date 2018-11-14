import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import {
  createFilter,
  createBlacklistFilter,
} from 'redux-persist-transform-filter';

const middlewares = [thunk];

const blacklist = createBlacklistFilter('reducers', [
  'reducers.selectedFunction',
  'reducers.web3',
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
]);

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: [
  //   'reducers.selectedFunction',
  //   'reducers.web3',
  //   'reducers.TransactionToSend',
  //   'reducers.network',
  //   'reducers.provider',
  //   'reducers.blockHeader',
  //   'reducers.timeSinceLastBlock',
  //   'reducers.peerCount',
  //   'reducers.modals',
  //   'reducers.DeployContractForm',
  //   'reducers.SelectedTransction',
  //   'reducers.SelectedWallet',
  //   'reducers.SelectedEvent',
  // ],
};

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export const persistor = persistStore(store, {
  transforms: [blacklist],
});

// persistor.purge();
