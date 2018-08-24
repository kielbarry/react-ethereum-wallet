/**
Helper functions
**/

/**
Global template helpers
**/

/**
A simple template helper to log objects in the console.
**/
export function debub(object) {
  console.log(object);
);

/**
Check if in mist
**/
export function isMist() {
  return window.mistMode === undefined && window.mist !== undefined;
});

/**
Check if in mist and in mist mode
**/
export function isWalletMode() {
  // also show network info in normal browsers
  return window.mistMode === 'wallet' || window.mist === undefined;
});

/**
Check if wallet was loaded from browser other than Mist
**/
export function isBrowserMode() {
  return window.mist === undefined;
});

/**
Check if currency unit is an ether unit
**/
//TODO
export function isEtherUnit() {
  // var unit = EthTools.getUnit();
  // return !(
  //   unit === 'usd' ||
  //   unit === 'eur' ||
  //   unit === 'btc' ||
  //   unit === 'gbp' ||
  //   unit === 'brl'
  // );
});

/**
Check if wallet has vulnerabilities
**/
//TODO
// isVulnerable(address) {
//   var account = _.isString(address)
//     ? Helpers.getAccountByAddress(address)
//     : this;

//   if (!account) return;

//   // check if is wallet and is vulnerable
//   if (
//     _.find(account.vulnerabilities || [], function(vul) {
//       return vul;
//     })
//   ) {
//     return account;
//   }

//   // check if is owner account and is vulnerable
//   var wallets = _.map(
//     Wallets.find({ vulnerabilities: { $exists: true } }).fetch(),
//     function(wal) {
//       return !!_.find(wal.vulnerabilities || [], function(vul) {
//         return vul;
//       })
//         ? wal
//         : false;
//     }
//   );
//   var wallet = _.find(wallets, function(wal) {
//     return _.contains(wal.owners, account.address);
//   });

//   if (wallet) {
//     // add vulnerabilities to account
//     account.vulnerabilities = wallet.vulnerabilities;
//     return account;
//   } else return false;
// });

/**
Return the current unit
**/
//TODO
export function unit() {
  return EthTools.getUnit();
});

/**
Return the latest block
**/
export async function latestBlock(web3) {
  return web3.eth.getBlock('latest')
});

/**
Returns a list of accounts and wallets sorted by balance
**/
// TODO
// Template.registerHelper('selectAccounts', function(hideWallets) {
//   var accounts = EthAccounts.find(
//     { balance: { $ne: '0' } },
//     { sort: { balance: 1 } }
//   ).fetch();

//   if (hideWallets !== true)
//     accounts = _.union(
//       Wallets.find(
//         {
//           owners: {
//             $in: _.map(EthAccounts.find().fetch(), function(account) {
//               return account.address.toLowerCase();
//             })
//           },
//           address: {
//             $exists: true
//           }
//         },
//         {
//           sort: { name: 1 }
//         }
//       ).fetch(),
//       accounts
//     );

//   return accounts;
// });

/**
Check if the given wallet is a watch only wallet, by checking if we are one of owners in the wallet.
**/
// TODO
Template.registerHelper('isWatchOnly', Helpers.isWatchOnly);

/**
Return the right wallet icon

@method (walletIcon)
**/

// TODO
// Template.registerHelper('walletIcon', function() {
//   var icon = '';

//   if (!_.isUndefined(this.owners)) {
//     if (Helpers.isWatchOnly(this._id))
//       icon = '<i class="icon-eye" title="Watch only"></i>';
//     else icon = '<i class="icon-wallet" title="Wallet"></i>';
//   } else icon = '<i class="icon-key" title="Account"></i>';

//   return new Spacebars.SafeString(icon);
// });

/**
Get the account name or display the address

@method (accountNameOrAddress)
@param {String} address
*/
// // TODO
// Template.registerHelper('accountNameOrAddress', function(address) {
//   if ((account = Helpers.getAccountByAddress(address))) return account.name;
//   else return address;
// });

/**
Format a number based on decimal numbers

    {{formatNumberByDecimals tokenAmount decimals}}

@method formatNumberByDecimals
@param {Number} number
@param {Number} decimals
*/

// TODO
// Template.registerHelper(
//   'formatNumberByDecimals',
//   Helpers.formatNumberByDecimals
// );

/**
Formats a timestamp to any format given.

    {{formatTime myTime "YYYY-MM-DD"}}

@method (formatTime)
@param {String} time         The timstamp, can be string or unix format
@param {String} format       the format string, can also be "iso", to format to ISO string, or "fromnow"
//@param {Boolean} realTime    Whether or not this helper should re-run every 10s
@return {String} The formated time
**/
// TODO
// Template.registerHelper('formatTime', Helpers.formatTime);

/**
Formats a given transactions balance

    {{formatTransactionBalance value exchangeRates "ether"}}

@method formatTransactionBalance
@param {String} value  the value to format
@param {Object} exchangeRates  the exchange rates to use
@param {String} unit  the unit to format to
@return {String} The formated value
**/
// TODO
// Template.registerHelper(
//   'formatTransactionBalance',
//   Helpers.formatTransactionBalance
// );

/**
Formats address to a CaseChecksum

@method toChecksumAddress
@param {String} address             The address
@return {String} checksumAddress    The returned, checksummed address
**/
export function toChecksumAddress(web3, address) {
  return typeof address === 'string' ? web3.utils.toChecksumAddress(address) : '';
});

/**
Takes a camelcase and shows it with spaces

@method toSentence
@param {string} camelCase    A name in CamelCase or snake_case format
@return {string} sentence    The same name with spaces
**/
// TODO
// Template.registerHelper('toSentence', Helpers.toSentence);

/**
Check if on main network

@method (isMainNetwork)
**/

// TODO
// Template.registerHelper('isMainNetwork', function() {
//   return Session.get('network') === 'main';
// });
