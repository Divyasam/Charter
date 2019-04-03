import axios from 'axios';

export function transactionList() {
    return function (dispatch){
            return axios.get('/api/transactions')
                        .then(response => {   
                            dispatch({
                              type: 'TRANSACTION_LIST',
                              payload: response.data
                            })
                        })
    }
}




