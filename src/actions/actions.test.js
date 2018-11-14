import * as Actions from './actions.js';
import * as Constants from '../constants/TestConstants.js';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should create action for setEthereumProviderConfig', () => {
    const store = mockStore({ Web3Initializer: {} });

    return store
      .dispatch(Actions.setEthereumProviderConfig(Constants.provConfigInput))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(Constants.provConfigAction);
      });
  });

  //TODO: updateWalletContracts

  // TODO: updatePendingContracts
  it('should create action for updatePendingContracts', () => {
    expect(Actions.updatePendingContracts(Constants.provConfigInput)).toEqual(
      Constants.provConfigAction
    );
  });

  it('should create action for setting wallets', () => {
    expect(Actions.setWallets(Constants.setWalletsInput)).toEqual(
      Constants.setWalletsAction
    );
  });

  //  TODO: updateInitialContractMethodOutputs
  // UPDATE_INITIAL_CONTRACT_METHOD_OUTPUTS
  // TODO: updateFunctionInput
  // UPDATE_FUNCTION_INPUT
  // TODO: updateExecutingWallet
  // UPDATE_EXECUTING_WALLET

  // TODO: updateSelectedFunction
  // UPDATE_SELECTED_FUNCTION
  // TODO: updateJSON
  // UPDATE_JSON_INTERFACE
  // TODO: updateQRCode
  // UPDATE_QR_CODE
  // TODO: updateSelectedEvent
  // UPDATE_SELECTED_EVENT
  // TODO: addContractFunctions
  // ADD_CONTRACT_FUNCTIONS
  // TODO: addContractConstants
  // ADD_CONTRACT_CONSTANTS
  // TODO: updateContractLog
  // UPDATE_PAST_CONTRACT_LOGS
  // TODO: addPastContractLogs
  // ADD_PAST_CONTRACT_LOGS
  // TODO: fetchTokensForAutoScan
  // multiple dispatch

  // TODO: updateMainDCF
  // UPDATE_MAIN_DCF
  // TODO: updateDCFRadio
  // UPDATE_DCF_RADIO
  // TODO: updateMainContractAddress
  // UPDATE_MAIN_CONTRACT_ADDRESS
  // TODO: updateDeployContractForm
  // UPDATE_DEPLOY_CONTRACT_FORM
  // TODO: updateSelectedTransaction
  // UPDATE_SELECTED_TRANSACTION
  // TODO: clearTransactionToSend
  // CLEAR_TRANSACTION_TO_SEND
  // TODO: updateTransactionConfirmation
  // UPDATE_TRANSACTION_CONFIRMATION
  // TODO: updateTransaction
  // UPDATE_TRANSACTION

  it('should create action for adding a tx to a list', () => {
    expect(Actions.addTransaction(Constants.addTransactionInput)).toEqual(
      Constants.addTransactionAction
    );
  });

  it('should create action for displaying a toast notification', () => {
    expect(
      Actions.displayGlobalNotification(Constants.displayGlobalNotifactionInput)
    ).toEqual(Constants.displayGlobalNotifactionAction);
  });

  // TODO: updateTransactionToSend
  // UPDATE_TRANSACTION_TO_SEND
  // TODO: fetchEthGasStationStats

  // TODO: emptySelectedContract
  // EMPTY_SELECTED_CONTRACT
  // TODO: selectedContract
  // SET_SELECTED_CONTRACT
  // TODO: tokenToDelete
  // SET_TOKEN_TO_DELETE
  // TODO: deleteToken
  // DELETE_TOKEN
  // TODO: addObservedToken
  // ADD_OBSERVED_TOKEN
  it('should create action for observing a token', () => {
    expect(Actions.addObservedToken(Constants.addObservedTokenInput)).toEqual(
      Constants.addObservedTokenAction
    );
  });
  // TODO: cancelTokenToWatch
  // CANCEL_TOKEN_TO_WATCH
  // TODO: updateTokenToWatch
  // UPDATE_TOKEN_TO_WATCH

  it('should create action for observing a contract', () => {
    expect(
      Actions.addObservedContract(Constants.pendingContractsInput)
    ).toEqual(Constants.pendingContractsAction);
  });

  // TODO: cancelContractToWatch
  // CANCEL_CONTRACT_TO_WATCH

  // TODO: updateContractToWatch
  // UPDATE_CONTRACT_TO_WATCH

  it('should create action for hiding a modal', () => {
    expect(Actions.closeModal(Constants.undisplayModalInput)).toEqual(
      Constants.undisplayModalAction
    );
  });

  it('should create action for showing a modal', () => {
    expect(Actions.displayModal(Constants.displayModalInput)).toEqual(
      Constants.displayModalAction
    );
  });

  // TODO: createInitWalletContract
  // CREATE_INIT_WALLET_CONTRACT

  it('should create action for updating exchange rates', () => {
    expect(
      Actions.updateEtherPrices(Constants.updateExchangeRatesInput)
    ).toEqual(Constants.updateExchangeRatesAction);
  });

  // TODO: emptySelectedWallet
  // EMPTY_SELECTED_WALLET

  it('should create action for selecting a wallet', () => {
    expect(Actions.selectedWallet(Constants.updateSelectedWalletInput)).toEqual(
      Constants.updateSelectedWalletAction
    );
  });

  // TODO: updateDisplayValue
  // can be deleted?
  // UPDATE_DISPLAY_VALUE

  it('should create action for updating total balance', () => {
    expect(
      Actions.updateTotalBalance(Constants.updateTotalBalanceInput)
    ).toEqual(Constants.updateTotalBalanceAction);
  });

  it('should create action for setting wallets', () => {
    expect(Actions.setWallets(Constants.setWalletsInput)).toEqual(
      Constants.setWalletsAction
    );
  });

  it('should create action for updating provider', () => {
    expect(Actions.updateProvider(Constants.updateBlockHeaderInput)).toEqual(
      Constants.updateBlockHeaderAction
    );
  });

  it('should create action for updating blockheader', () => {
    expect(Actions.updateBlockHeader(Constants.updateBlockHeaderInput)).toEqual(
      Constants.updateBlockHeaderAction
    );
  });

  it('should create action for connected peercount', () => {
    expect(Actions.updatePeerCount(Constants.updatePeercountInput)).toEqual(
      Constants.updatePeercountAction
    );
  });

  it('should create action for selecting currency', () => {
    expect(Actions.updateCurrency(Constants.updateCurrencyInput)).toEqual(
      Constants.updateCurrencyAction
    );
  });

  it('should create action for updating the network', () => {
    expect(
      Actions.updateConnectedNetwork(Constants.connectedNetworkInput)
    ).toEqual(Constants.connectedNetworkAction);
  });
});
