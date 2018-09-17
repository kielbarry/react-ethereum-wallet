import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ErrorBoundary from './errorBoundaries/ErrorBoundary';
import { Provider } from 'react-redux';
import store from './store/store.js';
// web3Init
import getWeb3 from './web3/getWeb3.js';
require('dotenv').config();

getWeb3.catch(err => console.warn('Error in web3 initialization.', err));

if (process.env.NODE_ENV === 'development') {
  // const {whyDidYouUpdate} = require('why-did-you-update');
  // whyDidYouUpdate(React);
}

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
