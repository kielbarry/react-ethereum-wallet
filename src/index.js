import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import { Provider, connect } from  'react-redux';
import { Provider } from 'react-redux';

import store from './store/store.js';

// web3Init
import getWeb3 from './web3/getWeb3.js';

getWeb3.catch(err => console.warn('Error in web3 initialization.', err));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
