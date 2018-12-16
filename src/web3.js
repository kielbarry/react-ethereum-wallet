import Web3 from 'web3';

let web3;

// if (window.web3) {
// web3 = new Web3(window.web3.currentProvider);
// } else {
web3 = new Web3('http://127.0.0.1:8545');
// }

export default web3;
