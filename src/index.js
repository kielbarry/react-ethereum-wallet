import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import { Provider, connect } from  'react-redux';
import { Provider } from  'react-redux';

import store from './store/store.js';

// actions
import Actions  from './actions/actions.js';

console.log(store.getState())

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));

 registerServiceWorker();
