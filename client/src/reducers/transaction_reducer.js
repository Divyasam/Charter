export default function(state={}, action) {
	switch(action.type) {
		case 'TRANSACTION_LIST':
		  return {...state, transactions: action.payload}
		default:
		  return state;
	}
}
