import moment from 'moment';
import isFinite from 'lodash/isFinite';
import ethUtils from 'ethereumjs-util';
import web3 from '../web3';

const BigNumber = ethUtils.BN;

export function updateTokenbalances(accounts, wallets, TokenContract) {
  const addresses = Object.assign({}, accounts, wallets);

  Object.keys(addresses).map(address => {
    let balance;
    TokenContract.methods
      .balanceOf(address)
      .call()
      .then(res => {
        console.log('res', res);
        balance = res;
      });
  });
}

/*
Returns the from now time, using a javascript date obejct if less than 23 hours

@method (timeFromNow)
@return {String}
*/

export function timeFromNow(string) {
  const diff = new Date() - new Date(string);
  const hours = parseInt(diff / 360000, 10);
  if (hours <= 24) return '(Less than a day ago)';
  return `(Less than ${Math.ceil(hours / 24)} days ago)`;
}

export function floatToTime(input) {
  let str = ' ~';
  if (input < 1) {
    str += `${Math.round((input * 60) / 10) * 10} seconds.`;
  } else if (input < 60) {
    str += `${Math.ceil(input)} minute(s).`;
  } else {
    str += `${Math.ceil(input / 60)} hour(s).`;
  }
  return str;
}

export function getMinutes(string) {
  const d = new Date(string);
  return d.getMinutes();
}

export function getHours(string) {
  const d = new Date(string);
  return d.getHours();
}

export function getYear(string) {
  const d = new Date(string);
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
  const d = new Date(string);
  return days[d.getDay()];
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

export function getDate(string) {
  const d = new Date(string);
  return d.getDate();
}

export function getFullTime(string) {
  let h = getHours(string);
  const amORpm = h > 12 ? 'PM' : 'AM';
  if (h > 12) h %= 12;

  return `${getDayOfWeek(string)}, ${getMonthName(string)} ${getDate(
    string
  )}, ${getYear(string)} ${h}:${getMinutes(string)} ${amORpm}`;
}

export function displayPriceFormatter(props, balance = 0, currencyOverride) {
  balance = new BigNumber(balance);
  const currency = currencyOverride ? 'ETHER' : props.reducers.currency;
  const exchangeRates = props.reducers.exchangeRates;
  if (exchangeRates === undefined || exchangeRates === null) return;
  let displayPrice;
  if (currency === 'FINNEY') {
    displayPrice = web3.utils.fromWei(balance, 'finney');
  } else {
    displayPrice = web3.utils.fromWei(balance, 'ether');
    if (currency !== 'ETHER') {
      displayPrice = Number(
        `${Math.round(
          `${displayPrice * exchangeRates[currency.toLowerCase()]}e2`
        )}e-2`
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
      if (respJSON.ETH) {
        const body = respJSON.ETH;
        const exchangeRates = {};
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
        please check your internet connection.${err}`
      );
      return err;
    });
}

export function createNewAccount(web3, cb) {
  alert('https://github.com/ethereum/web3.js/issues/494');
  alert('https://github.com/ethereum/go-ethereum/issues/2723');
}

export function getAccounts(setWallets, updateTotalBalance) {
  try {
    web3.eth.getAccounts().then(accounts => {
      let totalBalance = new BigNumber(0);
      accounts.forEach(acc => {
        const account = acc;
        web3.eth.getBalance(acc, (err, balance) => {
          setWallets({ account, balance: new BigNumber(balance) });
          totalBalance = totalBalance.add(new BigNumber(balance));
          updateTotalBalance(totalBalance);
        });
      });
    });
  } catch (err) {
    console.warn('web3 provider not open');
    return err;
  }
}

export function listenForIncomingTransactions(web3, accounts) {
  // console.log('listenForIncomingTransactions');
  // try {
  //   let subscription = web3.eth
  //     .subscribe('pendingTransactions', (err, res) => {
  //       if (err) console.log(err);
  //       if (res) {
  //         console.log(res);
  //       }
  //     })
  //     .on('data', function(transaction) {
  //       console.log(transaction);
  //     })
  //     .on('error', function(error) {
  //       console.log(error);
  //     });
  // } catch (err) {
  //   console.warn('err in listen');
  // }
}

export function updatePendingConfirmations(
  block,
  transactions,
  updateTransaction
) {
  if (!transactions) return;

  const pending = Object.keys(transactions).filter(tx => {
    return transactions[tx].confirmationNumber === 'Pending';
  });

  if (pending.length === 0) return;

  const currentBlock = block.number;
  pending.map((txHash, index) => {
    web3.eth.getTransactionReceipt(txHash).then(receipt => {
      if (receipt === null) return;
      const confirmations = currentBlock - receipt.blockNumber;
      receipt.confirmationNumber = confirmations;
      updateTransaction({
        name: [receipt.transactionHash],
        value: receipt,
      });
    });
  });
}

export function updateTransactionConfirmation(
  block,
  transactions,
  updateTransactionConfirmation
) {
  if (!transactions) return;

  const unconfirmed = Object.keys(transactions).filter(tx => {
    return (
      transactions[tx].confirmationNumber !== 'Pending' &&
      transactions[tx].confirmationNumber < 12
    );
  });

  if (unconfirmed.length === 0) return;

  const currentBlock = block.number;
  unconfirmed.map((txHash, index) => {
    web3.eth.getTransaction(txHash, (error, tx) => {
      if (error) console.warn('error with transaction hash: ', txHash);
      const confirmations = currentBlock - tx.blockNumber;
      updateTransactionConfirmation({
        name: [txHash],
        value: confirmations,
      });
    });
  });
}
