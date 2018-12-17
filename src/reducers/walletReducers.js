export const initialState = {
  Wallets: {},
};

export const walletReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ADDRESS_NAME':
      return {
        ...state,
        Wallets: {
          ...state.Wallets,
          [action.payload.address]: {
            ...state.Wallets[action.payload.address],
            name: action.payload.name,
          },
        },
        selectedWallet: {
          ...state.selectedWallet,
          name: action.payload.name,
        },
      };
    case 'UPDATE_ACCOUNT_TOKEN_BALANCE':
      return {
        ...state,
        Wallets: {
          ...state.Wallets,
          [action.payload.account]: {
            ...state.Wallets[action.payload.account],
            tokens: {
              ...state.Wallets[action.payload.account].tokens,
              [action.payload.tokenAddress]: action.payload.value,
            },
          },
        },
      };
    case 'SET_WALLETS':
      return {
        ...state,
        Wallets: {
          ...state.Wallets,
          [action.payload.account]: {
            ...state.Wallets[action.payload.account],
            balance: action.payload.balance,
          },
        },
      };
  }
};
