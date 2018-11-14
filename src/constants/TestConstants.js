export const provConfigAction = {
  type: 'SET_ETHEREUM_PROVIDER_CONFIG',
  payload: {
    selectedProvider: 'Geth',
    selectedPort: '8546',
    selectedNetwork: 'MainNet',
  },
};
export const provConfigInput = {
  selectedProvider: 'Geth',
  selectedPort: '8546',
  selectedNetwork: 'MainNet',
};

export const pendingContractsAction = {
  type: 'UPDATE_PENDING_CONTRACTS',
};

export const pendingContractsInput = {
  type: 'UPDATE_PENDING_CONTRACTS',
};

export const addObservedTokenAction = {
  type: 'ADD_OBSERVED_TOKEN',
  payload: addObservedTokenInput,
};

export const addObservedTokenInput = {
  address: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
  name: 'ZRX',
  symbol: '0x',
  division: '18',
};

export const undisplayModalAction = {
  type: 'CLOSE_MODAL',
  payload: undisplayModalInput,
};

export const undisplayModalInput = 'modalToUndisplay';

export const displayModalAction = {
  type: 'DISPLAY_MODAL',
  payload: displayModalInput,
};

export const displayModalInput = 'modalToDisplay';

export const updateExchangeRatesAction = {
  type: 'UPDATE_EXCHANGE_RATES',
  payload: updateExchangeRatesInput,
};

export const updateExchangeRatesInput = {
  btc: 0.0325,
  usd: 207.03,
  eur: 181.57,
  gbp: 159.35,
  brl: 784.88,
};

export const updateSelectedWalletAction = {
  type: 'SET_SELECTED_WALLET',
  payload: updateSelectedWalletInput,
};

export const updateSelectedWalletInput = {
  address: '0x65B42142606a9D46d05ea5205Ad4b610A9130e92',
  number: 3,
  currency: 'ETHER',
  addressType: 'account',
};

export const updateTotalBalanceAction = {
  types: 'UPDATE_TOTAL_BALANCE',
  payload: updateTotalBalanceInput,
};

export const updateTotalBalanceInput = 1000000000000000000;

export const setWalletsAction = {
  type: 'SET_WALLETS',
  payload: setWalletsInput,
};

export const setWalletsInput = {
  0x9ca862100a77b316e1d20b9553cf73e5a89fb281: {
    balance: '0',
  },
  0x60160e29cc7f310892a197f2f13a0d81c2d864df: {
    balance: '0',
  },
};

export const updateProviderAction = {
  type: 'UPDATE_PROVIDER',
  payload: updateProviderInput,
};

export const updateProviderInput = 'Geth';

export const updateBlockHeaderAction = {
  type: 'UPDATE_BLOCKHEADER',
  payload: updateBlockHeaderInput,
};

export const updateBlockHeaderInput = {
  gasLimit: 7576975,
  gasUsed: 2287105,
  number: '3,338,051',
  timestamp: 1542199355,
};

export const updatePeercountAction = {
  type: 'UPDATE_PEERCOUNT',
  payload: updatePeercountInput,
};

export const updatePeercountInput = 25;

export const updateCurrencyAction = {
  type: 'UPDATE_CURRENCY_UNIT',
  payload: updateCurrencyInput,
};

export const updateCurrencyInput = 'ETHER';

export const connectedNetworkAction = {
  type: 'UPDATE_CONNECTED_NETWORK',
  payload: connectedNetworkInput,
};

export const connectedNetworkInput = 'rinkeby';
