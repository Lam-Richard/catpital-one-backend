const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const Alpaca = require("@alpacahq/alpaca-trade-api");
const alpaca = new Alpaca({
  keyId: "PKRTDHD80018SUDO4TST",
  secretKey: "rgCzkzaXjpvUAbrmyGQCr19XpycPgUwY0h42v1gN",
  paper: true,
  usePolygon: false,
});
const app = express();

const port = 3000;

app.get("/", (req, res) => {
  console.log("connected");
  res.send("connected");
});

// Gets account info
app.get("/account", (req, res) => {
  alpaca
    .getAccount()
    .then((account) => {
      res.send(account);
    })
    .catch((e) => {
      res.send(e);
    });
});

// Gets information about a specific asset
app.get("/asset/:symbol", (req, res) => {
  alpaca
    .getAsset(req.params.symbol)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send(e);
    });
});

// Place a buy or sell order. Must provide symbol, quantity (shares) and 'buy' or 'sell'
app.post("/buySell", jsonParser, (req, res) => {
  alpaca
    .createOrder({
      symbol: req.body.symbol,
      qty: req.body.qty,
      side: req.body.side,
      type: "market",
      time_in_force: "day",
    })
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send(e);
    });
});

// Gets a list of the user's positions
app.get("/positions", (req, res) => {
  alpaca
    .getPositions()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send(e);
    });
});

// Gets the user's position for a specific stock
app.get("/position/:symbol", (req, res) => {
  alpaca
    .getPosition(req.params.symbol)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send(e);
    });
});

// Gets a list of all assets (so what's tradeable w the api, not what's owned)
app.get("/allAssets", (req, res) => {
  alpaca
    .getAssets()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send(e);
    });
});

// Gets a list of all orders previously placed
app.get("/orders", (req, res) => {
  alpaca
    .getOrders()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send(e);
    });
});

// Get last quote must pass symbol
app.get("/lastQuote/:symbol", (req, res) => {
  alpaca
    .lastQuote(req.params.symbol)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send(e);
    });
});

// Get last trade must pass symbol
app.get("/lastTrade/:symbol", (req, res) => {
  alpaca
    .lastTrade(req.params.symbol)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send(e);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
