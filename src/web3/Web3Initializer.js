import Web3 from 'web3';
import { store } from '../store/store.js';

const ethereumConnection = null;

export default class Web3Initializer {
  static init() {
    const config = store.getState().reducers.Web3Initializer;
    let ProviderNetwork = '';

    console.log('ethereumConnection', ethereumConnection);
    if (ethereumConnection === null) {
      return new Promise((resolve, reject) => {
        return resolve(new Web3('ws://localhost:8546'));
      }).then((err, res) => {
        if (err) console.warn('yes here is err', err);
        if (res) console.log('here is res', res);
      });

      // console.log(eth)

      // console.log("ethereumConnection", ethereumConnection)
      // ethereumConnection = new Web3('ws://localhost:8546');
      // console.log('ethereumConnection', ethereumConnection);
      // ethereumConnection.eth.isSyncing().then(console.log);
      // console.log(ethereumConnection._provider.connected);
      // return ethereumConnection;
    }

    console.log('here is config', config);
    const prov = config.selectedProvider.toLowerCase();
    if (prov === 'geth' || prov === 'parity' || prov === 'ganache') {
      ProviderNetwork = `ws://127.0.0.1:${config.selectedPort}`;
    }
    if (prov.toLowerCase() === 'metamask') {
    }
    if (prov.toLowerCase() === 'infura') {
      ProviderNetwork = `wss://${config.selectedNetwork.toLowerCase()}.infura.io/ws`;
    }

    return ProviderNetwork;
    // return new Web3('ws://127.0.0.1:8545')
  }
}

// const Web3Initializer = () => {
//   // let web3 = new Web3();
//   console.log(
//     'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
//   );
//   console.log("here is the store", store)

// //   const web3Reducer = (state = null, action) => {
// //   if (action.type === 'WEB3_INITIALIZED') {
// //     return { ...state, web3Instance: action.payload.web3Instance };
// //   }
// //   return state;
// // };

// // export default web3Reducer;
// let ProviderNetwork = '';
// if (action.type === 'SET_ETHEREUM_PROVIDER_CONFIG') {
//   let config = action.payload;
//   return { ...state, web3Config: action.payload }
//   console.log('here is config', config);
//   let prov = config.selectedProvider.toLowerCase();
//   if (prov === 'geth' || prov === 'parity') {
//     ProviderNetwork = 'ws://127.0.0.1:' + config.selectedPort;
//   }
//   if (prov.toLowerCase() === 'metamask') {
//   }
//   if (prov.toLowerCase() === 'infura') {
//     ProviderNetwork = 'https://' + config.selectedNetwork + '.infura.io/';
//   }
// } else {
//   //   return state;
//   // }
//   // console.log('ProviderNetwork', ProviderNetwork);
//   // let web3 = ProviderNetwork !== '' ? new Web3(ProviderNetwork) : null;
//   // console.log(web3);
//   // console.log(web3.eth.isSyncing());
//   // if (web3.eth.isSyncing()) {
//   //   this.props.history.push('/accounts');
//   //   store.dispatch(action.payload);
//   //   return web3;
//   // }
// };

// export default Web3Initializer;
