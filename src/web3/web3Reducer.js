const web3Reducer = (state = null, action) => {
  if (action.type === 'WEB3_INITIALIZED') {
    return { ...state, web3Instance: action.payload.web3Instance };
  }
  return state;
};

export default web3Reducer;
