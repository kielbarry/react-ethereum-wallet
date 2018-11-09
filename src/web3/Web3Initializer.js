import { store } from '../store/store.js';
import Web3 from 'web3';

const Web3Initializer = (state = null, action) => {
  // let web3 = new Web3();
  console.log(
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  );
  let ProviderNetwork = '';
  if (action.type === 'SET_ETHEREUM_PROVIDER_CONFIG') {
    let config = action.payload;
    console.log('here is config', config);
    let prov = config.selectedProvider.toLowerCase();
    if (prov === 'geth' || prov === 'parity') {
      ProviderNetwork = 'ws://127.0.0.1:' + config.port;
    }
    if (prov.toLowerCase() === 'metamask') {
    }
    if (prov.toLowerCase() === 'infura') {
      ProviderNetwork = 'https://' + config.selectedNetwork + '.infura.io/';
    }
  }

  console.log('ProviderNetwork', ProviderNetwork);
  let web3 = ProviderNetwork !== '' ? new Web3(ProviderNetwork) : null;
  console.log(web3);
  console.log(web3.eth.isSyncing());
  if (web3.eth.isSyncing()) {
    this.props.history.push('/accounts');
    store.dispatch(action.payload);
    return web3;
  }
};

export default Web3Initializer;
