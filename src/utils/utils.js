import moment from 'moment';
import isFinite from 'lodash/isFinite';
// var Web3 = require('web3');
import Web3 from 'web3';
let newWeb3 = new Web3();

export function displayPriceFormatter2(props, balance, currencyOverride) {
  if (balance === undefined || isNaN(balance) || balance === null) balance = 0;
  let currency = currencyOverride ? 'ETHER' : props.reducers.currency;
  let totalBalance = balance.toString();
  let exchangeRates = props.reducers.exchangeRates;
  if (exchangeRates === undefined || exchangeRates === null) return;
  let displayPrice;
  if (currency === 'FINNEY') {
    displayPrice = newWeb3.utils.fromWei(totalBalance, 'finney');
  } else {
    displayPrice = newWeb3.utils.fromWei(totalBalance, 'ether');
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
/*
Returns the from now time, using a javascript date obejct if less than 23 hours

@method (timeFromNow)
@return {String}
*/

export function timeFromNow(string) {
  let diff = new Date() - new Date(string);
  let hours = parseInt(diff / 360000, 10);
  if (hours <= 24) return '(Less than a day ago)';
  return '(Less than ' + Math.ceil(hours / 24) + ' days ago)';
}

export function floatToTime(input) {
  let str = ' ~';
  if (input < 1) {
    str += Math.round((input * 60) / 10) * 10 + ' seconds.';
  } else if (input < 60) {
    str += Math.ceil(input) + ' minute(s).';
  } else {
    str += Math.ceil(input / 60) + ' hour(s).';
  }
  return str;
}

export function getFullTime(string) {
  let h = getHours(string);
  let amORpm = h > 12 ? 'PM' : 'AM';
  if (h > 12) h = h % 12;

  return (
    getDayOfWeek(string) +
    ', ' +
    getMonthName(string) +
    ' ' +
    getDate(string) +
    ', ' +
    getYear(string) +
    ' ' +
    h +
    ':' +
    getMinutes(string) +
    ' ' +
    amORpm
  );
}

export function getMinutes(string) {
  let d = new Date(string);
  return d.getMinutes();
}

export function getHours(string) {
  let d = new Date(string);
  return d.getHours();
}

export function getYear(string) {
  let d = new Date(string);
  return d.getFullYear();
}

export function getDayOfWeek(string) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let d = new Date(string);
  return days[d.getDay()];
}

export function getDate(string) {
  let d = new Date(string);
  return d.getDate();
}

export function getMonthName(string) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const d = new Date();
  return monthNames[d.getMonth()];
}

export function toNotWei(totalBalance, currency) {
  let web3 = new Web3();
  return currency === 'FINNEY'
    ? web3.utils.fromWei(totalBalance, 'finney')
    : web3.utils.fromWei(totalBalance, 'ether');
}

export function displayPriceFormatter(props, balance, currencyOverride) {
  if (balance === undefined || isNaN(balance) || balance === null) balance = 0;
  let web3 = props.web3.web3Instance;
  let currency = currencyOverride ? 'ETHER' : props.reducers.currency;
  let totalBalance = balance.toString();
  let exchangeRates = props.reducers.exchangeRates;
  if (exchangeRates === undefined || exchangeRates === null) return;
  let displayPrice;
  // = toNotWei(totalBalance, currency);
  if (currency === 'FINNEY') {
    displayPrice = newWeb3.utils.fromWei(totalBalance, 'finney');
  } else {
    displayPrice = newWeb3.utils.fromWei(totalBalance, 'ether');
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

export function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
/**
Created random 32 byte string

@method random32Bytes
*/
export function random32Bytes() {
  let randomBytes;
  for (var i = 0; i < 16; i++) randomBytes += s4();
  return randomBytes;
}

export async function checkNetwork(web3, cb) {
  try {
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
  } catch (err) {
    console.warn('web3 provider not open');
    return err;
  }
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
}

export function updateAccountBalances(web3, accounts, cb1, cb2) {
  let totalBalance = 0;
  accounts.map(acc => {
    let account = acc;
    web3.eth.getBalance(acc, (err, balance) => {
      cb1({ account, balance });
      totalBalance += Number(balance);
      cb2(totalBalance);
    });
  });
}

export function getAccounts(web3, cb1, cb2) {
  try {
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
  } catch (err) {
    console.warn('web3 provider not open');
    return err;
  }
}

export function updateTransactionConfirmation(web3, transactions, cb1) {
  if (!transactions) return;
  let unconfirmed = Object.keys(transactions).filter(tx => {
    return (
      transactions[tx].confirmationNumber !== 'Pending' &&
      transactions[tx].confirmationNumber < 12
    );
  });
  let pending = Object.keys(transactions).filter(tx => {
    return transactions[tx].confirmationNumber === 'Pending';
  });
  let subscription;
  try {
    while (unconfirmed.length) {
      subscription = web3.eth.subscribe('newBlockHeaders', (err, b) => {
        let currentBlock = b.number;
        unconfirmed.map((txHash, index) => {
          console.log(unconfirmed.length);
          // double check localStorage data is indeed a tx
          web3.eth.getTransaction(txHash, (error, tx) => {
            if (err)
              console.warn(
                'there was an error updating the transaction with hash: ',
                txHash
              );
            let confirmations = currentBlock - tx.blockNumber;
            if (confirmations >= 12) {
              unconfirmed.splice(index, 1);
            }
            cb1({
              name: [txHash],
              value: confirmations,
            });
          });
        });
      });
    }
    subscription.unsubscribe(function(error, success) {
      if (success) console.log('Error unsubscribing!', error);
      if (success) console.log('Successfully unsubscribed!');
    });
  } catch (err) {
    console.warn('web3 provider not open');
    return err;
  }
}

export function getNewBlockHeaders(web3, cb1, cb2, transactions, cb3) {
  try {
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

      // if(transactions) {
      //   transactions.map(txHash => {
      //     console.log("inside getNewBlockHeaders", txHash)
      //     web3.eth.getTransaction(txHash, (error, tx) => {
      //       if(err) console.warn("there was an error updating the transaction with hash: " txHash)
      //       cb3({
      //         name: [txHash],
      //         value: b.number,
      //       })
      //     })
      //   })
      // }
    });
  } catch (err) {
    console.warn('web3 provider not open');
    return err;
  }
}
