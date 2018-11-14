import * as Actions from './actions.js';
import * as Constants from '../constants/ActionsTestConstants.js';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// snapshot testing?
// prints out an ast copy?

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should create action for setEthereumProviderConfig', async () => {
    const store = mockStore({ Web3Initializer: {} });
    await store.dispatch(
      Actions.setEthereumProviderConfig(Constants.provConfigInput)
    );
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    [...Array(actions.length).keys()].map((_, index) => {
      expect(actions[index]).toEqual(Constants.provConfigAction[index]);
    });
  });

  // //TODO: updateWalletContracts

  // // TODO: updatePendingContracts
  // it('should create action for updatePendingContracts', () => {
  //   expect(Actions.updatePendingContracts(Constants.provConfigInput)).toEqual(
  //     Constants.provConfigAction
  //   );
  // });

  // it('should create action for setting wallets', () => {
  //   expect(Actions.setWallets(Constants.setWalletsInput)).toEqual(
  //     Constants.setWalletsAction
  //   );
  // });

  // //  TODO: updateInitialContractMethodOutputs
  // // UPDATE_INITIAL_CONTRACT_METHOD_OUTPUTS
  // // TODO: updateFunctionInput
  // // UPDATE_FUNCTION_INPUT
  // // TODO: updateExecutingWallet
  // // UPDATE_EXECUTING_WALLET

  // // TODO: updateSelectedFunction
  // // UPDATE_SELECTED_FUNCTION
  it('should create action for updating a selected function', async () => {
    const store = mockStore({ selectedFunction: {} });
    await store.dispatch(
      Actions.updateSelectedFunction(Constants.updatedSelectedFunctionInput)
    );
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    [...Array(actions.length).keys()].map((_, index) => {
      expect(actions[index]).toEqual(
        Constants.updatedSelectedFunctionAction[index]
      );
    });
  });
  // // TODO: updateJSON
  // // UPDATE_JSON_INTERFACE
  // // TODO: updateQRCode
  // // UPDATE_QR_CODE
  // // TODO: updateSelectedEvent
  // // UPDATE_SELECTED_EVENT
  // // TODO: addContractFunctions
  // // ADD_CONTRACT_FUNCTIONS
  // // TODO: addContractConstants
  // // ADD_CONTRACT_CONSTANTS
  // // TODO: updateContractLog
  // // UPDATE_PAST_CONTRACT_LOGS
  // // TODO: addPastContractLogs
  // // ADD_PAST_CONTRACT_LOGS
  // // TODO: fetchTokensForAutoScan
  // // multiple dispatch

  // // TODO: updateMainDCF
  // // UPDATE_MAIN_DCF
  // // TODO: updateDCFRadio
  // // UPDATE_DCF_RADIO
  // // TODO: updateMainContractAddress
  // // UPDATE_MAIN_CONTRACT_ADDRESS
  // // TODO: updateDeployContractForm
  // // UPDATE_DEPLOY_CONTRACT_FORM
  // // TODO: updateSelectedTransaction
  // // UPDATE_SELECTED_TRANSACTION
  // // TODO: clearTransactionToSend
  // // CLEAR_TRANSACTION_TO_SEND
  // // TODO: updateTransactionConfirmation
  // // UPDATE_TRANSACTION_CONFIRMATION
  // // TODO: updateTransaction
  // // UPDATE_TRANSACTION

  it('should create action for adding a tx to a list', async () => {
    const store = mockStore({ Transactions: {} });
    await store.dispatch(Actions.addTransaction(Constants.addTransactionInput));
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    [...Array(actions.length).keys()].map((_, index) => {
      expect(actions[index]).toEqual(Constants.addTransactionAction[index]);
    });
  });

  it('should create action for displaying a toast notification', async () => {
    const store = mockStore({ globalNotification: {} });
    await store.dispatch(
      Actions.displayGlobalNotification(Constants.displayGlobalNotifactionInput)
    );
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    [...Array(actions.length).keys()].map((_, index) => {
      expect(actions[index]).toEqual(
        Constants.displayGlobalNotifactionAction[index]
      );
    });
  });

  // // TODO: updateTransactionToSend
  // // UPDATE_TRANSACTION_TO_SEND
  // // TODO: fetchEthGasStationStats

  // // TODO: emptySelectedContract
  // // EMPTY_SELECTED_CONTRACT
  // // TODO: selectedContract
  // // SET_SELECTED_CONTRACT
  // // TODO: tokenToDelete
  // // SET_TOKEN_TO_DELETE
  // // TODO: deleteToken
  // // DELETE_TOKEN
  // // TODO: addObservedToken
  // // ADD_OBSERVED_TOKEN
  // it('should create action for observing a token', () => {
  //   expect(Actions.addObservedToken(Constants.addObservedTokenInput)).toEqual(
  //     Constants.addObservedTokenAction
  //   );
  // });
  // // TODO: cancelTokenToWatch
  // // CANCEL_TOKEN_TO_WATCH
  // // TODO: updateTokenToWatch
  // // UPDATE_TOKEN_TO_WATCH

  // it('should create action for observing a contract', async () => {
  //   const store = mockStore({ ObservedContracts: {} });
  //   await store.dispatch(Actions.addObservedContract(Constants.pendingContractsInput))
  //   const actions = store.getActions();
  //   expect(actions.length).toEqual(1);
  //   [...Array(actions.length).keys()].map((_, index) => {
  //     expect(actions[index]).toEqual(Constants.pendingContractsAction[index]);
  //   })
  // });

  // // TODO: cancelContractToWatch
  // // CANCEL_CONTRACT_TO_WATCH

  // // TODO: updateContractToWatch
  // // UPDATE_CONTRACT_TO_WATCH

  it('should create action for hiding a modal', async () => {
    const store = mockStore({ modals: {} });
    await store.dispatch(Actions.closeModal(Constants.undisplayModalInput));
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    [...Array(actions.length).keys()].map((_, index) => {
      expect(actions[index]).toEqual(Constants.undisplayModalAction[index]);
    });
  });

  it('should create action for showing a modal', async () => {
    const store = mockStore({ modals: {} });
    await store.dispatch(Actions.displayModal(Constants.displayModalInput));
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    [...Array(actions.length).keys()].map((_, index) => {
      expect(actions[index]).toEqual(Constants.displayModalAction[index]);
    });
  });

  // // TODO: createInitWalletContract
  // // CREATE_INIT_WALLET_CONTRACT

  it('should create action for updating exchange rates', async () => {
    const store = mockStore({ exchangeRates: {} });
    await store.dispatch(
      Actions.updateEtherPrices(Constants.updateExchangeRatesInput)
    );
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    [...Array(actions.length).keys()].map((_, index) => {
      expect(actions[index]).toEqual(
        Constants.updateExchangeRatesAction[index]
      );
    });
  });

  // // TODO: emptySelectedWallet
  // // EMPTY_SELECTED_WALLET

  it('should create action for selecting a wallet', async () => {
    const store = mockStore({ exchangeRates: {} });
    await store.dispatch(
      Actions.selectedWallet(Constants.updateSelectedWalletInput)
    );
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    [...Array(actions.length).keys()].map((_, index) => {
      expect(actions[index]).toEqual(
        Constants.updateSelectedWalletAction[index]
      );
    });
  });

  // // TODO: updateDisplayValue
  // // can be deleted?
  // // UPDATE_DISPLAY_VALUE

  it('should create action for updating total balance', async () => {
    const store = mockStore({ totalBalance: '' });
    await store.dispatch(
      Actions.updateTotalBalance(Constants.updateTotalBalanceInput)
    );
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    [...Array(actions.length).keys()].map((_, index) => {
      expect(actions[index]).toEqual(Constants.updateTotalBalanceAction[index]);
    });
  });

  it('should create action for setting wallets', async () => {
    const store = mockStore({ Wallets: {} });
    await store.dispatch(Actions.setWallets(Constants.setWalletsInput));
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    [...Array(actions.length).keys()].map((_, index) => {
      expect(actions[index]).toEqual(Constants.setWalletsAction[index]);
    });
  });

  it('should create action for updating provider', async () => {
    const store = mockStore({ provider: '' });
    await store.dispatch(Actions.updateProvider(Constants.updateProviderInput));
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    [...Array(actions.length).keys()].map((_, index) => {
      expect(actions[index]).toEqual(Constants.updateProviderAction[index]);
    });
  });

  it('should create action for updating blockheader', async () => {
    const store = mockStore({ blockheader: {} });
    await store.dispatch(
      Actions.updateBlockHeader(Constants.updateBlockHeaderInput)
    );
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    [...Array(actions.length).keys()].map((_, index) => {
      expect(actions[index]).toEqual(Constants.updateBlockHeaderAction[index]);
    });
  });

  it('should create action for connected peerCount', async () => {
    const store = mockStore({ peerCount: '' });
    await store.dispatch(
      Actions.updatePeerCount(Constants.updatePeercountInput)
    );
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    [...Array(actions.length).keys()].map((_, index) => {
      expect(actions[index]).toEqual(Constants.updatePeercountAction[index]);
    });
  });

  it('should create action for selecting currency', async () => {
    const store = mockStore({ currency: '' });
    await store.dispatch(Actions.updateCurrency(Constants.updateCurrencyInput));
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    [...Array(actions.length).keys()].map((_, index) => {
      expect(actions[index]).toEqual(Constants.updateCurrencyAction[index]);
    });
  });

  it('should create action for updating the network', async () => {
    const store = mockStore({ network: '' });
    await store.dispatch(
      Actions.updateConnectedNetwork(Constants.connectedNetworkInput)
    );
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    [...Array(actions.length).keys()].map((_, index) => {
      expect(actions[index]).toEqual(Constants.connectedNetworkAction[index]);
    });
  });
});
