// import actions from '../actions/actions.js';

// const initialState = {};

export default function(state, action) {
	console.log("state in reducer", state)
	console.log("action in reducer", action)
	switch(action.type) {
		case 'UPDATE_CURRENCY_UNIT': 
			return {
				...state,
				currency: action.payload
			}
		case 'UPDATE_CONNECTED_NETWORK': 
			return {
				...state,
				network: action.payload
			}
		default:
			return state;
	}
}