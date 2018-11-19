export const provConfigInput = {
  selectedProvider: 'Geth',
  selectedPort: '8546',
  selectedNetwork: 'MainNet',
};

export const provConfigAction = [
  {
    type: 'SET_ETHEREUM_PROVIDER_CONFIG',
    payload: provConfigInput,
  },
];

export const updatedSelectedFunctionInput = {
  constant: false,
  inputs: [
    {
      name: '_addr',
      type: 'address',
    },
  ],
  name: 'isOwner',
  outputs: [
    {
      name: '',
      type: 'bool',
    },
  ],
  type: 'function',
  contractAddress: '0x11a8e225e740F283601cC0E8e0f8D56740896B54',
};

export const updatedSelectedFunctionAction = [
  {
    type: 'UPDATE_SELECTED_FUNCTION',
    payload: updatedSelectedFunctionInput,
  },
];

export const updateJsonInterfaceInput = [
  { constant: false, inputs: [{ name: '_owner', type: 'address' }] },
];

export const updateJsonInterfaceAction = [
  {
    type: 'UPDATE_JSON_INTERFACE',
    payload: updateJsonInterfaceInput,
  },
];

export const updateQrCodeInput = '0x0000000000000000000000000000000000000000';

export const updateQrCodeAction = [
  {
    type: 'UPDATE_QR_CODE',
    payload: updateQrCodeInput,
  },
];

export const updateSelectedEventInput = [
  {
    address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
    blockNumber: 6715977,
    transactionHash:
      '0xbc9267d277216f5d4f86471930606cb4ba0a8e8fd3de42288405702bd921f25b',
    transactionIndex: 14,
    blockHash:
      '0x8380054fd40ff7d38c556e4138d4b691b32ad71541abd4455a594a7a4eb3ea12',
    logIndex: 2,
    removed: false,
    id: 'log_3016bfa0',
    returnValues: {
      '0': '0x0000000000000000000000000000000000000000',
      '1': '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
      '2': '1187527',
      from: '0x0000000000000000000000000000000000000000',
      to: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
      tokenId: '1187527',
    },
    event: 'Transfer',
    signature:
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    raw: {
      data:
        '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006012c8cf97bead5deae237070f9587f8e7a266d0000000000000000000000000000000000000000000000000000000000121ec7',
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      ],
    },
    timestamp: '2018-11-16T15:35:20.000Z',
    originalContractName: 'cryptokitties',
    originalContractAddress: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
  },
];

export const updateSelectedEventAction = [
  {
    type: 'UPDATE_SELECTED_EVENT',
    payload: updateSelectedEventInput,
  },
];

export const updatePastContractLogsInput = {
  address: '0x0000000000000000000000000000000000000000',
  blockNumber: 6715977,
  transactionHash:
    '0xbc9267d277216f5d4f86471930606cb4ba0a8e8fd3de42288405702bd921f25b',
  transactionIndex: 14,
  blockHash:
    '0x8380054fd40ff7d38c556e4138d4b691b32ad71541abd4455a594a7a4eb3ea12',
  logIndex: 1,
  removed: false,
  id: 'log_af89799c',
  returnValues: {
    '0': '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
    '1': '1187527',
    '2': '0',
    '3': '0',
    '4':
      '721721688703249183577140237600328673412502101259981582285362175270850564',
    owner: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
    kittyId: '1187527',
    matronId: '0',
    sireId: '0',
    genes:
      '721721688703249183577140237600328673412502101259981582285362175270850564',
  },
  event: 'Birth',
  signature:
    '0x0a5311bd2a6608f08a180df2ee7c5946819a649b204b554bb8e39825b2c50ad5',
  raw: {
    data:
      '0x00000000000000000000000006012c8cf97bead5deae237070f9587f8e7a266d0000000000000000000000000000000000000000000000000000000000121ec7000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000689225304c6800e438ed5ad045a4a808da64b169521cb5358a0284d21004',
    topics: [
      '0x0a5311bd2a6608f08a180df2ee7c5946819a649b204b554bb8e39825b2c50ad5',
    ],
  },
  timestamp: '2018-11-16T15:35:20.000Z',
};

export const updatePastContractLogsAction = [
  {
    type: 'UPDATE_PAST_CONTRACT_LOGS',
    payload: updatePastContractLogsInput,
  },
];

export const addPastContractLogsInput = {
  address: '0x0000000000000000000000000000000000000000',
  blockNumber: 6715977,
  transactionHash:
    '0xbc9267d277216f5d4f86471930606cb4ba0a8e8fd3de42288405702bd921f25b',
  transactionIndex: 14,
  blockHash:
    '0x8380054fd40ff7d38c556e4138d4b691b32ad71541abd4455a594a7a4eb3ea12',
  logIndex: 1,
  removed: false,
  id: 'log_af89799c',
  returnValues: {
    '0': '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
    '1': '1187527',
    '2': '0',
    '3': '0',
    '4':
      '721721688703249183577140237600328673412502101259981582285362175270850564',
    owner: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
    kittyId: '1187527',
    matronId: '0',
    sireId: '0',
    genes:
      '721721688703249183577140237600328673412502101259981582285362175270850564',
  },
  event: 'Birth',
  signature:
    '0x0a5311bd2a6608f08a180df2ee7c5946819a649b204b554bb8e39825b2c50ad5',
  raw: {
    data:
      '0x00000000000000000000000006012c8cf97bead5deae237070f9587f8e7a266d0000000000000000000000000000000000000000000000000000000000121ec7000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000689225304c6800e438ed5ad045a4a808da64b169521cb5358a0284d21004',
    topics: [
      '0x0a5311bd2a6608f08a180df2ee7c5946819a649b204b554bb8e39825b2c50ad5',
    ],
  },
  timestamp: '2018-11-16T15:35:20.000Z',
};

export const addPastContractLogsAction = [
  {
    type: 'ADD_PAST_CONTRACT_LOGS',
    payload: addPastContractLogsInput,
  },
];

export const updateDCFRadioInput = {
  simpleChecked: true,
  multisigChecked: false,
  importWalletChecked: false,
};

export const updateDCFRadioAction = [
  {
    type: 'UPDATE_DCF_RADIO',
    payload: updateDCFRadioInput,
  },
];

export const updateDCFMainAddressInput = {
  MainOwnerAddress: '0x0000000000000000000000000000000000000000',
  multiSigContract: {
    MainOwnerAddress: '0x0000000000000000000000000000000000000000',
  },
};

export const updateDCFMainAddressAction = [
  {
    type: 'UPDATE_MAIN_CONTRACT_ADDRESS',
    payload: updateDCFMainAddressInput,
  },
];

export const updateSelectedTransactionsInput = {
  from: '0x65b42142606a9d46d05ea5205ad4b610a9130e92',
  gasPrice: 31000000000,
  value: '1000000000000000000',
  to: '0x9ca862100a77b316e1d20b9553cf73e5a89fb281',
  estimatedGas: 21000,
  dateSent: 0,
  confirmationNumber: 2,
  blockHash:
    '0xd91c38ad0c91f164f48520b8bc4dd5e97c93511305a3d676cdbe69719634c6fa',
  blockNumber: 3350519,
  contractAddress: null,
  cumulativeGasUsed: 2984167,
  gasUsed: 21000,
  logs: [],
  logsBloom:
    '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  transactionHash:
    '0x115712b5a2fa444cf92103483ed9f4834381b2ed5e8f2a672b48442ce5e4c27e',
  transactionIndex: 3,
};

export const updateSelectedTransactionsAction = [
  {
    type: 'UPDATE_SELECTED_TRANSACTION',
    payload: updateSelectedTransactionsInput,
  },
];

export const updateTransactionConfirmationNumberInput = [
  {
    name: '0x0000000000000000000000000000000000000000',
    value: 3,
  },
];

export const updateTransactionConfirmationNumberAction = [
  {
    type: 'UPDATE_TRANSACTION_CONFIRMATION',
    payload: updateTransactionConfirmationNumberInput,
  },
];

export const addTransactionInput = {
  hash: 0x1554c5f6831425d37468fdc41bb034a6227af17fc018788f9f54d6179da579f1,
  value: {
    from: '0x65B42142606a9D46d05ea5205Ad4b610A9130e92',
    value: '1000000000000000000',
    gasPrice: 23000000000,
    to: '0x9cA862100a77B316e1d20B9553Cf73e5a89fB281',
    estimatedGas: 3763821,
    dateSent: new Date(),
    confirmationNumber: 'Pending',
  },
};

export const addTransactionAction = [
  {
    type: 'ADD_TRANSACTION',
    payload: addTransactionInput,
  },
];

export const displayGlobalNotifactionInput = [
  {
    display: true,
    type: 'error',
    msg: 'Invalid address input',
  },
];

export const displayGlobalNotifactionAction = [
  {
    type: 'DISPLAY_GLOBAL_NOTIFICATION',
    payload: displayGlobalNotifactionInput,
  },
];

export const pendingContractsInput = {
  type: 'UPDATE_PENDING_CONTRACTS',
};

export const pendingContractsAction = [
  {
    type: 'UPDATE_PENDING_CONTRACTS',
  },
];

export const setSelectedContractInput = [
  {
    contract: {
      jsonInterface:
        '[ { "constant": true, "inputs": [ { "name": "_interfaceID", "type": "bytes4" } ]}]',
      address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
      'contract-name': 'cryptokitties',
      balance: '241212889412113592079',
      logs: [],
      contractAddress: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
      deployedWalletContract: false,
      contractFunctions: [],
      contractConstants: [],
    },
    currency: 'ETHER',
    exchangeRates: {},
    addressType: 'contract',
  },
];

export const setSelectedContractAction = [
  {
    type: 'SET_SELECTED_CONTRACT',
    payload: setSelectedContractInput,
  },
];

export const addObservedTokenInput = {
  address: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
  name: 'ZRX',
  symbol: '0x',
  division: '18',
};

export const addObservedTokenAction = [
  {
    type: 'ADD_OBSERVED_TOKEN',
    payload: addObservedTokenInput,
  },
];

export const addObservedContractInput = {
  '0x0000000000000000000000000000000000000000': {
    address: '0x0000000000000000000000000000000000000000',
    'contract-name': 'asdfasd',
    jsonInterface:
      '[ { "constant": true, "inputs": [ { "name": "_interfaceID", "type": "bytes4" } ]}]',
    balance: 0,
    contractAddress: '0x0000000000000000000000000000000000000000',
    logs: [],
  },
};

export const addObservedContractAction = [
  {
    type: 'ADD_OBSERVED_CONTRACT',
    payload: addObservedContractInput,
  },
];

export const updateContractToWatchInput = {
  address: '0x0000000000000000000000000000000000000000',
  'contract-name': 'contract name',
  jsonInterface:
    '[ { "constant": true, "inputs": [ { "name": "_interfaceID", "type": "bytes4" } ]}]',
};

export const updateContractToWatchAction = [
  {
    type: 'UPDATE_CONTRACT_TO_WATCH',
    payload: updateContractToWatchInput,
  },
];

export const undisplayModalInput = 'modalToUndisplay';

export const undisplayModalAction = [
  {
    type: 'CLOSE_MODAL',
    payload: undisplayModalInput,
  },
];

export const displayModalInput = 'modalToDisplay';

export const displayModalAction = [
  {
    type: 'DISPLAY_MODAL',
    payload: displayModalInput,
  },
];

export const updateExchangeRatesInput = {
  btc: 0.0325,
  usd: 207.03,
  eur: 181.57,
  gbp: 159.35,
  brl: 784.88,
};

export const updateExchangeRatesAction = [
  {
    type: 'UPDATE_EXCHANGE_RATES',
    payload: updateExchangeRatesInput,
  },
];

export const updateSelectedWalletInput = {
  address: '0x65B42142606a9D46d05ea5205Ad4b610A9130e92',
  number: 3,
  currency: 'ETHER',
  addressType: 'account',
};

export const updateSelectedWalletAction = [
  {
    type: 'SET_SELECTED_WALLET',
    payload: updateSelectedWalletInput,
  },
];

export const updateTotalBalanceInput = 1000000000000000000;

export const updateTotalBalanceAction = [
  {
    type: 'UPDATE_TOTAL_BALANCE',
    payload: updateTotalBalanceInput,
  },
];

export const setWalletsInput = {
  0x9ca862100a77b316e1d20b9553cf73e5a89fb281: {
    balance: '0',
  },
  0x60160e29cc7f310892a197f2f13a0d81c2d864df: {
    balance: '0',
  },
};

export const setWalletsAction = [
  {
    type: 'SET_WALLETS',
    payload: setWalletsInput,
  },
];

export const updateProviderInput = 'Geth';

export const updateProviderAction = [
  {
    type: 'UPDATE_PROVIDER',
    payload: updateProviderInput,
  },
];

export const updateBlockHeaderInput = {
  gasLimit: 7576975,
  gasUsed: 2287105,
  number: '3,338,051',
  timestamp: 1542199355,
};

export const updateBlockHeaderAction = [
  {
    type: 'UPDATE_BLOCKHEADER',
    payload: updateBlockHeaderInput,
  },
];

export const updatePeercountInput = 25;

export const updatePeercountAction = [
  {
    type: 'UPDATE_PEERCOUNT',
    payload: updatePeercountInput,
  },
];

export const updateCurrencyInput = {
  CurrencyUnit: 'ETHER',
};

export const updateCurrencyAction = [
  {
    type: 'UPDATE_CURRENCY_UNIT',
    payload: updateCurrencyInput.CurrencyUnit,
  },
];

export const connectedNetworkInput = 'rinkeby';

export const connectedNetworkAction = [
  {
    type: 'UPDATE_CONNECTED_NETWORK',
    payload: connectedNetworkInput,
  },
];
