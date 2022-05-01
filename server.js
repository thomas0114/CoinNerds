var express = require('express');
var cors = require('cors')
var  freeForexAPI  =  require('freeforexapi');
const Binance = require('binance-api-node').default;
const Binance_client = Binance();

let p_btc = 0;
let p_eth = 0;
let p_doge = 0;
let p_dash = 0;
let p_xmr = 0;      // Monero
let p_usdc = 0;

let p_eur = 0;
let p_aed = 0;
let p_inr = 0;
let p_pkr = 0;
let p_cad = 0;


setInterval(async() => {
    freeForexAPI.getQuotes(['USDEUR', 'USDCAD', 'EURUSD', 'USDINR', 'USDAED', 'USDPKR'], res => {
        p_eur = res['EURUSD']['rate'];
        p_aed = 1/res['USDAED']['rate'];
        p_inr = 1/res['USDINR']['rate'];
        p_pkr = 1/res['USDPKR']['rate'];
        p_cad = 1/res['USDCAD']['rate']
    })
    const prices = await Binance_client.prices()
    Object.keys(prices).forEach(function(key) {
        if (key === 'BTCUSDT') {
            p_btc = prices[key];
        }
        if (key === 'ETHUSDT') {
            p_eth = prices[key];
        }
        if (key === 'DOGEUSDT') {
            p_doge = prices[key];
        }
        if (key === 'DASHUSDT') {
            p_dash = prices[key];
        }
        if (key === 'XMRUSDT') {
            p_xmr = prices[key];
        }
        if (key === 'USDCUSDT') {
            p_usdc = prices[key];
        }
    });
}, 2000)

var app = express();

app.use(cors())

app.get('/get_cyrpto_currency', function(req, res) {
    let vaules = [p_btc, p_eth, p_doge, p_dash, p_xmr,p_usdc , p_eur, p_aed, p_inr, p_pkr];
    res.send({
        success: 1,
        prices: vaules,
        p_cad: p_cad
    })
});

app.listen(3001, function() {
    console.log('listening node app');
});