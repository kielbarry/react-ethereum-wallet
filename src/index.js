import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie9'; // For IE 9-11 support
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ErrorBoundary from './errorBoundaries/ErrorBoundary';
import { store, persistor } from './store/store';
// web3Init
import getWeb3 from './web3/getWeb3';

getWeb3.catch(err => console.warn('Error in web3 initialization.', err));

if (process.env.NODE_ENV === 'development') {
  // const {whyDidYouUpdate} = require('why-did-you-update');
  // whyDidYouUpdate(React);
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
