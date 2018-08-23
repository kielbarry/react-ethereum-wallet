import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import { Provider, connect } from  'react-redux';
import { Provider } from  'react-redux';

import store from './store/store.js';

// web3Init
import getWeb3 from './web3/getWeb3.js';

// actions
// import Actions  from './actions/actions.js';

getWeb3.then(results => {
  console.log('Web3 initialized!', results)
}).catch(() => {
  console.log('Error in web3 initialization.')
})


ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

 registerServiceWorker();
