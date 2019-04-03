const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let transaction = [
    {
      name: 'Customer 1',
      transactionHistory: {
          January: [120, 110, 90],
          February: [110, 80, 90],
          March: [70, 150, 40]
      }      
    },
    {
      name: 'Customer 2',
      transactionHistory: {
          January: [130, 110, 80],
          February: [140, 150, 60],
          March: [30, 160, 110]
      }      
    }
];

app.get('/api/transactions', (req,res) => {
	res.send(transaction);
})

app.listen(port, () => {
	console.log('Server is running');
})