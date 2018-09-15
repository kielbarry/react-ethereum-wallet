import moment from 'moment'
import isFinite from 'lodash/isFinite'

export async function getCryptoComparePrices() {
  // TODO :  used to update transactions as well
  // TODO : extraParams field in url
  let url = 'https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=BTC,USD,EUR,GBP,BRL&ts=';
  url += moment().unix();
  console.log(url)
  return fetch(url)
  .then(resp => {
    if (resp && resp.status === 200) return resp.json()
  })
  .then(respJSON => {
    if(respJSON['ETH']) {
      let body = respJSON['ETH']
      let exchangeRates = {}
      Object.keys(body).map(key => {
        if(body[key] && isFinite(body[key])) exchangeRates[key.toLowerCase()] = body[key]
      })
      return exchangeRates
    }
  })
  .catch(err => {
    console.warn(
      'Cannot connect to https://min-api.cryptocompare.com/ to get price ticker data, please check your internet connection.' + err
    )
    return err
  })
}
/**
Created random 32 byte string

@method random32Bytes
*/
export function random32Bytes() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  let randomBytes
  for (var i = 0; i < 16; i++) randomBytes += s4()
  return randomBytes
};


export async function checkNetwork(web3, cb) {
  return web3.eth.getBlock(0).then((block) => {
    switch (block.hash) {
      case '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3':
        return 'main';
        break;
      case '0x6341fd3daf94b748c72ced5a5b26028f2474f5f00d824504e4fa37a75767e177':
        return 'rinkeby';
        break;
      case '0x41941023680923e0fe4d74a34bdac8141f2540e3ae90623718e47d66d1ca4a2d':
        return 'ropsten';
        break;
      case '0xa3c565fc15c7478862d50ccd6561e3c06b24cc509bf388941c25ea985ce32cb9':
        return 'kovan';
        break;
      default:
        return 'private';
    }
  }).then(resp => cb(resp));
};

export function nameProvider(prov) {
	switch(prov.constructor.name) {
		case 'MetamaskInpageProvider':
			return 'metamask';
			break;
		case 'WebsocketProvider':
			return 'geth';
			break;
		default:
			return 'unknown';
	}
}

export function createNewAccount(web3, cb) {

  alert("https://github.com/ethereum/web3.js/issues/494")
  alert("https://github.com/ethereum/go-ethereum/issues/2723")
  // web3.eth.personal.newAccount(function(err, resp){
  //   console.log(err)
  //   console.log(resp)
  // })
  // web3.eth.accounts.create().then(console.log)
  // web3.personal.newAccount()
}


export function getAccounts(web3, cb) {
	web3.eth.getAccounts().then(accounts => {
    accounts.map(acc => {
      let account = acc;
      web3.eth.getBalance(acc, (err, balance) => cb({account, balance}))
    })
  })
}

export function getNewBlockHeaders(web3, cb1, cb2) {
	web3.eth.subscribe('newBlockHeaders', (err, b) => {
    if(!err) cb1({ gasLimit: b.gasLimit, gasUsed: b.gasUsed, number: b.number, size: b.size,timestamp: b.timestamp })
    web3.eth.net.getPeerCount().then((peerCount) => cb2(peerCount));
  });
}
