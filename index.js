const express = require('express');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();


const Alpaca = require('@alpacahq/alpaca-trade-api');
const alpaca = new Alpaca({
    keyId: 'INSERTKEYHERE',
    secretKey: 'INSERTKEYHERE',
    paper: true,
    usePolygon: false
});
const app = express();

const port = 3000;


//
app.get('/', (req, res) => {
    console.log('connected');
    res.send('connected');
})

//
app.get('/account', (req, res) => {
    alpaca.getAccount().then((account) => {
        res.send(account);
    })
});

//
app.get('/asset/:symbol', (req, res) => {
    alpaca.getAsset(req.params.symbol).then(data => {
        res.send(data);
    })
})


//
app.post('/buySell', jsonParser,  (req, res) => {
    alpaca.createOrder({
        symbol: req.body.symbol, 
        qty: req.body.qty, 
        side: req.body.side,
        type: 'market',
        time_in_force: 'day',
    }).then(data => {
        res.send(data);
    })
})

app.get('/positions', (req, res) => {
    alpaca.getPositions().then(data => {
        res.send(data);
    })
})

app.get('/position/:symbol', (req, res) => {
    alpaca.getPosition(req.params.symbol).then(data => {
        res.send(data);
    })
})

app.get('/allAssets', (req, res) => {
    alpaca.getAssets().then(data => {
        res.send(data);
    })
})


app.get('/orders', (req, res) => {
    alpaca.getOrders().then(data => {
        res.send(data);
    })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});