import moment from 'moment';
import isFinite from 'lodash/isFinite';

export function displayPriceFormatter(props, balance, currencyOverride) {
  if (balance === undefined || isNaN(balance) || balance === null) balance = 0;
  let web3 = props.web3.web3Instance;
  let currency = currencyOverride ? 'ETHER' : props.reducers.currency;
  let totalBalance = balance.toString();
  let exchangeRates = props.reducers.exchangeRates;
  if (exchangeRates === undefined || exchangeRates === null) return;
  let displayPrice;
  if (currency === 'FINNEY') {
    displayPrice = web3.utils.fromWei(totalBalance, 'finney');
  } else {
    displayPrice = web3.utils.fromWei(totalBalance, 'ether');
    if (currency !== 'ETHER') {
      displayPrice = Number(
        Math.round(
          displayPrice * exchangeRates[currency.toLowerCase()] + 'e2'
        ) + 'e-2'
      );
    }
  }
  return displayPrice;
}

export async function getCryptoComparePrices() {
  // TODO :  used to update transactions as well
  // TODO : extraParams field in url
  let url =
    'https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=BTC,USD,EUR,GBP,BRL&ts=';
  url += moment().unix();
  return fetch(url)
    .then(resp => {
      if (resp && resp.status === 200) return resp.json();
    })
    .then(respJSON => {
      if (respJSON['ETH']) {
        let body = respJSON['ETH'];
        let exchangeRates = {};
        // eslint-disable-next-line
        Object.keys(body).map(key => {
          if (body[key] && isFinite(body[key]))
            exchangeRates[key.toLowerCase()] = body[key];
        });
        return exchangeRates;
      }
    })
    .catch(err => {
      console.warn(
        `Cannot connect to https://min-api.cryptocompare.com/ to get price ticker data, 
        please check your internet connection.` + err
      );
      return err;
    });
}
/**
Created random 32 byte string

@method random32Bytes
*/
export function random32Bytes() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  let randomBytes;
  for (var i = 0; i < 16; i++) randomBytes += s4();
  return randomBytes;
}

export async function checkNetwork(web3, cb) {
  return web3.eth
    .getBlock(0)
    .then(block => {
      switch (block.hash) {
        case '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3':
          return 'main';
        case '0x6341fd3daf94b748c72ced5a5b26028f2474f5f00d824504e4fa37a75767e177':
          return 'rinkeby';
        case '0x41941023680923e0fe4d74a34bdac8141f2540e3ae90623718e47d66d1ca4a2d':
          return 'ropsten';
        case '0xa3c565fc15c7478862d50ccd6561e3c06b24cc509bf388941c25ea985ce32cb9':
          return 'kovan';
        default:
          return 'private';
      }
    })
    .then(resp => cb(resp));
}

export function nameProvider(prov) {
  switch (prov.constructor.name) {
    case 'MetamaskInpageProvider':
      return 'metamask';
    case 'WebsocketProvider':
      return 'geth';
    default:
      return 'unknown';
  }
}

export function createNewAccount(web3, cb) {
  alert('https://github.com/ethereum/web3.js/issues/494');
  alert('https://github.com/ethereum/go-ethereum/issues/2723');
  // web3.eth.accounts.wallet.add().then(resp =>console.log(resp));
  // web3.eth.personal.newAccount(function(err, resp){
  //   console.log(err)
  //   console.log(resp)
  // })
  // web3.eth.accounts.create(this.random32Bytes()).then(console.log)
  // web3.personal.newAccount()
}

export function getAccounts(web3, cb1, cb2) {
  web3.eth.getAccounts().then(accounts => {
    let totalBalance = 0;
    // eslint-disable-next-line
    accounts.map(acc => {
      let account = acc;
      web3.eth.getBalance(acc, (err, balance) => {
        cb1({ account, balance });
        totalBalance += Number(balance);
        cb2(totalBalance);
      });
    });
  });
}

export function getNewBlockHeaders(web3, cb1, cb2) {
  web3.eth.subscribe('newBlockHeaders', (err, b) => {
    if (!err)
      cb1({
        gasLimit: b.gasLimit,
        gasUsed: b.gasUsed,
        number: b.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        size: b.size,
        timestamp: b.timestamp,
      });
    web3.eth.net.getPeerCount().then(peerCount => cb2(peerCount));
  });
}
