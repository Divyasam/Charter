export default function(state={}, action) {
	switch(action.type) {
		case 'TRANSACTION_LIST':
		  return {...state, transactions: action.payload}
		 // case 'EMAIL_BY_ID':
		 //  return {...state, email: action.payload}
		default:
		  return state;
	}
}