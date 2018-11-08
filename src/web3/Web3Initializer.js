import { store } from '../store/store.js';
import Web3 from 'web3';

const Web3Initializer = (state = null, action) => {
  let web3 = new Web3();
  let ProviderNetwork = '';
  if (action.type === 'SET_ETHEREUM_PROVIDER_CONFIG') {
    let config = action.payload;
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
  return ProviderNetwork !== '' ? new Web3(provider) : null;
};

export default Web3Initializer;
