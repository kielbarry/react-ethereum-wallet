import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { assert } from 'chai';
import reducers, { initialState } from './reducers';

// todo: delete
import * as Constants from '../constants/ActionsTestConstants.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('reducers', () => {
  const state = initialState;

  afterEach(() => {
    fetchMock.restore();
  });

  it('should handle the SET_ETHEREUM_PROVIDER_CONFIG action', () => {
    const action = Constants.provConfigAction[0];
    const expectedState = {
      ...state,
      Web3Initializer: action.payload,
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  // it('should handle the UPDATE_WALLET_CONTRACT action', () => {
  //   const action = {
  //     type: 'UPDATE_WALLET_CONTRACT',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the DELETE_PENDING_CONTRACT action', () => {
  //   const action = {
  //     type: 'DELETE_PENDING_CONTRACT',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the UPDATE_PENDING_CONTRACTS action', () => {
  //   const action = {
  //     type: 'UPDATE_PENDING_CONTRACTS',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the UPDATE_INITIAL_CONTRACT_METHOD_OUTPUTS action', () => {
  //   const action = {
  //     type: 'UPDATE_INITIAL_CONTRACT_METHOD_OUTPUTS',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the UPDATE_FUNCTION_INPUT action', () => {
  //   const action = {
  //     type: 'UPDATE_FUNCTION_INPUT',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the UPDATE_EXECUTING_WALLET action', () => {
  //   const action = {
  //     type: 'UPDATE_EXECUTING_WALLET',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  it('should handle the UPDATE_SELECTED_FUNCTION action', () => {
    const action = Constants.updatedSelectedFunctionAction[0];
    const expectedState = {
      ...state,
      selectedFunction: { ...action.payload },
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  it('should handle the UPDATE_JSON_INTERFACE action', () => {
    const action = Constants.updateJsonInterfaceAction[0];
    const expectedState = {
      ...state,
      JSONInterface: action.payload,
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  it('should handle the UPDATE_QR_CODE action', () => {
    const action = Constants.updateQrCodeAction[0];
    const expectedState = {
      ...state,
      qrCode: action.payload,
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  it('should handle the UPDATE_SELECTED_EVENT action', () => {
    const action = Constants.updateSelectedEventAction[0];
    const expectedState = {
      ...state,
      SelectedEvent: action.payload,
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  // it('should handle the ADD_CONTRACT_FUNCTIONS action', () => {
  //   const action = {
  //     type: 'ADD_CONTRACT_FUNCTIONS',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the ADD_CONTRACT_CONSTANTS action', () => {
  //   const action = {
  //     type: 'ADD_CONTRACT_CONSTANTS',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the UPDATE_BALANCE_CHECKED action', () => {
  //   const action = {
  //     type: 'UPDATE_BALANCE_CHECKED',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the UPDATE_ERR_CHECKED action', () => {
  //   const action = {
  //     type: 'UPDATE_ERR_CHECKED',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  it('should handle the UPDATE_DCF_RADIO action', () => {
    const action = Constants.updateDCFRadioAction[0];
    const expectedState = {
      ...state,
      DeployContractForm: Object.assign(
        {},
        state.DeployContractForm,
        action.payload
      ),
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  // it('should handle the UPDATE_MAIN_DCF action', () => {
  //   const action = {
  //     type: 'UPDATE_MAIN_DCF',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  it('should handle the UPDATE_MAIN_CONTRACT_ADDRESS action', () => {
    const action = Constants.updateDCFMainAddressAction[0];
    const expectedState = {
      ...state,
      DeployContractForm: Object.assign(
        {},
        state.DeployContractForm,
        action.payload
      ),
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  // it('should handle the UPDATE_DEPLOY_CONTRACT_FORM action', () => {
  //   const action = {
  //     type: 'UPDATE_DEPLOY_CONTRACT_FORM',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  it('should handle the UPDATE_SELECTED_TRANSACTION action', () => {
    const action = Constants.updateSelectedTransactionsAction[0];
    const expectedState = {
      ...state,
      SelectedTransaction: action.payload,
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  // it('should handle the CLEAR_TRANSACTION_TO_SEND action', () => {
  //   const action = {
  //     type: 'CLEAR_TRANSACTION_TO_SEND',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  it('should handle the UPDATE_TRANSACTION_CONFIRMATION action', () => {
    const action = Constants.updateTransactionConfirmationNumberAction[0];
    const expectedState = {
      ...state,
      Transactions: {
        ...state.Transactions,
        [action.payload.name]: {
          ...state.Transactions[action.payload.name],
          confirmationNumber: action.payload.value,
        },
      },
    };
    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  // it('should handle the UPDATE_TRANSACTION action', () => {
  //   const action = {
  //     type: 'UPDATE_TRANSACTION',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  it('should handle the ADD_TRANSACTION action', () => {
    const action = Constants.addTransactionAction[0];
    const expectedState = {
      ...state,
      Transactions: Object.assign({}, state.Transactions, {
        [action.payload.hash]: action.payload.value,
      }),
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  it('should handle the DISPLAY_GLOBAL_NOTIFICATION action', () => {
    const action = Constants.displayGlobalNotifactionAction[0];
    const expectedState = {
      ...state,
      globalNotification: Object.assign(
        {},
        state.globalNotification,
        action.payload
      ),
    };
    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  // it('should handle the UPDATE_TRANSACTION_TO_SEND action', () => {
  //   const action = {
  //     type: 'UPDATE_TRANSACTION_TO_SEND',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the RECEIVED_GAS_ERROR action', () => {
  //   const action = {
  //     type: 'RECEIVED_GAS_ERROR',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the RECEIVE_GAS_STATS action', () => {
  //   const action = {
  //     type: 'RECEIVE_GAS_STATS',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the EMPTY_SELECTED_CONTRACT action', () => {
  //   const action = {
  //     type: 'EMPTY_SELECTED_CONTRACT',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  it('should handle the SET_SELECTED_CONTRACT action', () => {
    const action = Constants.setSelectedContractAction[0];
    const expectedState = {
      ...state,
      selectedContract: action.payload,
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  // it('should handle the SET_TOKEN_TO_DELETE action', () => {
  //   const action = {
  //     type: 'SET_TOKEN_TO_DELETE',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the DELETE_TOKEN action', () => {
  //   const action = {
  //     type: 'DELETE_TOKEN',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  it('should handle the ADD_OBSERVED_TOKEN action', () => {
    const action = Constants.addObservedTokenAction[0];
    const expectedState = {
      ...state,
      ObservedTokens: Object.assign({}, state.ObservedTokens, {
        [action.payload.name]: action.payload.value,
      }),
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  // it('should handle the CANCEL_TOKEN_TO_WATCH action', () => {
  //   const action = {
  //     type: 'CANCEL_TOKEN_TO_WATCH',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the UPDATE_TOKEN_TO_WATCH action', () => {
  //   const action = {
  //     type: 'UPDATE_TOKEN_TO_WATCH',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the CANCEL_CONTRACT_TO_WATCH action', () => {
  //   const action = {
  //     type: 'CANCEL_CONTRACT_TO_WATCH',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  it('should handle the UPDATE_CONTRACT_TO_WATCH action', () => {
    const action = Constants.updateContractToWatchAction[0];
    const expectedState = {
      ...state,
      ContractToWatch: Object.assign({}, state.ContractToWatch, {
        [action.payload.name]: action.payload.value,
      }),
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  // it('should handle the CLOSE_MODAL action', () => {
  //   const action = Constants.undisplayModalAction[0]
  //   console.log(action)
  //   const expectedState = {
  //     ...state,
  //     modals: Object.assign({}, ...state.modals, {
  //       [action.payload]: false,
  //     }),
  //   };

  //   console.log(expectedState)

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the DISPLAY_MODAL action', () => {
  //   const action = Constants.displayModalAction[0]
  //   const expectedState = {
  //     ...state,
  //     modals: Object.assign({}, ...state.modals, {
  //       [action.payload]: true,
  //     }),
  //   };

  //   console.log(expectedState)

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the CREATE_INIT_WALLET_CONTRACT action', () => {
  //   const action = {
  //     type: 'CREATE_INIT_WALLET_CONTRACT',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  it('should handle the UPDATE_EXCHANGE_RATES action', () => {
    const action = Constants.updateExchangeRatesAction[0];
    const expectedState = {
      ...state,
      exchangeRates: action.payload,
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  // it('should handle the UPDATE_ETHER_PRICES action', () => {
  //   const action = {
  //     type: 'UPDATE_ETHER_PRICES',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  // it('should handle the EMPTY_SELECTED_WALLET action', () => {
  //   const action = {
  //     type: 'EMPTY_SELECTED_WALLET',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  it('should handle the SET_SELECTED_WALLET action', () => {
    const action = Constants.updateSelectedWalletAction[0];
    const expectedState = {
      ...state,
      selectedWallet: action.payload,
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  // it('should handle the UPDATE_DISPLAY_VALUE action', () => {
  //   const action = {
  //     type: 'UPDATE_DISPLAY_VALUE',
  //     payload: { appVersion: '1.0.0' },
  //   };
  //   const expectedState = Object.assign({}, initialState, {
  //     appVersion: '1.0.0',
  //   });

  //   assert.deepEqual(reducers(initialState, action), expectedState);
  // });

  it('should handle the UPDATE_TOTAL_BALANCE action', () => {
    const action = Constants.updateTotalBalanceAction[0];
    const expectedState = {
      ...state,
      totalBalance: action.payload,
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  it('should handle the SET_WALLETS action', () => {
    const action = Constants.setWalletsAction[0];
    const expectedState = {
      ...state,
      Wallets: {
        ...state.Wallets,
        [action.payload.account]: {
          ...state.Wallets[action.payload.account],
          balance: action.payload.balance,
        },
      },
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  it('should handle the UPDATE_PROVIDER action', () => {
    const action = Constants.updateProviderAction[0];
    const expectedState = {
      ...state,
      provider: action.payload,
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  it('should handle the UPDATE_BLOCKHEADER action', () => {
    const action = Constants.updateBlockHeaderAction[0];
    const expectedState = {
      ...state,
      blockHeader: action.payload,
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  it('should handle the UPDATE_PEERCOUNT action', () => {
    const action = Constants.updatePeercountAction[0];
    const expectedState = {
      ...state,
      peerCount: action.payload,
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  it('should handle the UPDATE_CURRENCY_UNIT action', () => {
    const action = Constants.updateCurrencyAction[0];
    const expectedState = {
      ...state,
      currency: action.payload,
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  it('should handle the UPDATE_CONNECTED_NETWORK action', () => {
    const action = Constants.connectedNetworkAction[0];
    const expectedState = {
      ...state,
      network: action.payload,
    };

    assert.deepEqual(reducers(initialState, action), expectedState);
  });
});

describe('observeContacts reducers', () => {
  let state = initialState;

  it('should handle the ADD_OBSERVED_CONTRACT action', () => {
    const action = Constants.addObservedContractAction[0];
    const expectedState = {
      ...state,
      ObservedContracts: Object.assign(
        {},
        state.ObservedContracts,
        action.payload
      ),
    };

    // note updating the state
    state = expectedState;
    assert.deepEqual(reducers(initialState, action), expectedState);
  });

  it('should handle the ADD_PAST_CONTRACT_LOGS action', () => {
    const action = Constants.addPastContractLogsAction[0];
    const expectedState = {
      ...state,
      ObservedContracts: {
        ...state.ObservedContracts,
        [action.payload.address]: {
          ...state.ObservedContracts[action.payload.address],
          logs: action.payload,
        },
      },
    };

    // note state and not initial state
    assert.deepEqual(reducers(state, action), expectedState);
  });

  it('should handle the UPDATE_PAST_CONTRACT_LOGS action', () => {
    const action = Constants.updatePastContractLogsAction[0];
    const expectedState = {
      ...state,
      ObservedContracts: {
        ...state.ObservedContracts,
        [action.payload.address]: {
          ...state.ObservedContracts[action.payload.address],
          logs: [
            ...state.ObservedContracts[action.payload.address].logs,
            action.payload,
          ],
        },
      },
    };

    // note state and not initial state
    assert.deepEqual(reducers(state, action), expectedState);
  });
});
