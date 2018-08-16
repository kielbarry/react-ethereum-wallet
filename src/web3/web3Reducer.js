// const initialState = {
//   web3Instance: null
// }

// const initialState = {};

const web3Reducer = (state = null, action) => {
  if (action.type === 'WEB3_INITIALIZED') {
    // return Object.assign({}, state, {
      return {...state, web3Instance: action.payload.web3Instance}
    // })
  }

  return state
}

export default web3Reducer
