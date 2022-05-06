var express = require('express');
var cors = require('cors');

// const { Headers } = require('node-fetch');
var freeForexAPI = require('freeforexapi');
// var myHeaders = new Headers();
// // myHeaders.append("apikey", "b6LGL9i7bzi1Zyvrt3278rL53rBJjQzG");
// myHeaders.append("apikey", "CsMDChXxpUAacmga1g5n20D5ulpaEeTv");


// var requestOptions = {
//     method: 'GET',
//     redirect: 'follow',
//     headers: myHeaders
// };


const Binance = require('binance-api-node').default;
const Binance_client = Binance();

let p_btc = 0;
let p_eth = 0;
let p_doge = 0;
let p_dash = 0;
let p_xmr = 0;      // Monero
let p_usdc = 0;

let p_cad = 0;
let p_usd = 0;
let p_eur = 0;
let p_aed = 0;
let p_inr = 0;
let p_pkr = 0;
let p_cad1 = 0;
let p_usd1 = 0;
let p_eur1 = 0;
let p_aed1 = 0;
let p_inr1 = 0;
let p_pkr1 = 0;



setInterval(async () => {
    // const today = new Date()
    // const yesterday = new Date(today)
    // yesterday.setDate(yesterday.getDate() - 1);
    // function padTo2Digits(num) {
    //     return num.toString().padStart(2, '0');
    // }
    // function formatDate(date) {
    //     return (
    //         [
    //             date.getFullYear(),
    //             padTo2Digits(date.getMonth() + 1),
    //             padTo2Digits(date.getDate()),
    //         ].join('-')
    //     );
    // }

    // const symbols = ['CAD', 'USD', 'EUR', 'AED', 'INR', 'PKR'];

    // fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${symbols}&base=USD`, requestOptions)
    // .then(response => response.json())
    // .then(res => {
    //     // console.log(res)
    //     p_cad = res.rates.CAD;
    //     p_usd = res.rates.USD;
    //     p_eur = res.rates.EUR;
    //     p_aed = res.rates.AED;
    //     p_inr = res.rates.INR;
    //     p_pkr = res.rates.PKR;
    // })
    // .catch(error => console.log('error', error));
    freeForexAPI.getQuotes(['USDEUR', 'USDCAD', 'USDINR', 'USDAED', 'USDPKR'], res => {
        p_cad = 1 / res['USDCAD']['rate'];
        p_usd = 1;
        p_eur = 1 / res['USDEUR']['rate'];
        p_aed = 1 / res['USDAED']['rate'];
        p_inr = 1 / res['USDINR']['rate'];
        p_pkr = 1 / res['USDPKR']['rate'];
        p_cad1 = res['USDCAD']['rate'];
        p_usd1 = 1;
        p_eur1 = res['USDEUR']['rate'];
        p_aed1 = res['USDAED']['rate'];
        p_inr1 = res['USDINR']['rate'];
        p_pkr1 = res['USDPKR']['rate'];

    })
    const prices = await Binance_client.prices()
    Object.keys(prices).forEach(function (key) {

        if (key === 'BTCUSDT') {
            p_btc = Number(prices[key]);
        }
        if (key === 'ETHUSDT') {
            p_eth = Number(prices[key]);
        }
        if (key === 'DOGEUSDT') {
            p_doge = Number(prices[key]);
        }
        if (key === 'DASHUSDT') {
            p_dash = Number(prices[key]);
        }
        if (key === 'XMRUSDT') {
            p_xmr = Number(prices[key]);
        }
        if (key === 'USDCUSDT') {
            p_usdc = Number(prices[key]);
        }
    });
}, 1000)

var app = express();

app.use(cors())

app.get('/get_coinnerds_rate', function (req, res) {
    let vaules = [p_btc, p_eth, p_doge, p_dash, p_xmr, p_usdc, p_eur, p_aed, p_inr, p_pkr];
    let rates = [p_cad1, p_usd1, p_eur1, p_aed1, p_inr1, p_pkr1];
    res.send({
        success: 1,
        prices: vaules,
        rates: rates,
        p_cad: p_cad1,
    })
});

app.get('/api/get_currency_rate/:coin', function (req, res) {
    let now = new Date();
    if(req.params.coin === "btc")
    {
        res.send({
            name: "Bitcoin",
            symbol: "BTC",
            success: "true",
            rates: {
                "USDBTC":p_btc*p_usd1,
                "CADBTC":p_btc*p_cad1,
                "EURBTC":p_btc*p_eur1,
                "AEDBTC":p_btc*p_aed1,
                "INRBTC":p_btc*p_inr1,
                "PKRBTC":p_btc*p_pkr1,
            },
            time: now
        })
    }
    if(req.params.coin === "eth")
    {
        res.send({
            name: "Ethereum",
            symbol: "ETH",
            success: "true",
            rates: {
                "USDBTC":p_eth*p_usd1,
                "CADBTC":p_eth*p_cad1,
                "EURBTC":p_eth*p_eur1,
                "AEDBTC":p_eth*p_aed1,
                "INRBTC":p_eth*p_inr1,
                "PKRBTC":p_eth*p_pkr1,
            },
            time: now
        })
    }
    if(req.params.coin === "doge")
    {
        res.send({
            name: "Dogecoin",
            symbol: "DOGE",
            success: "true",
            rates: {
                "USDBTC":p_doge*p_usd1,
                "CADBTC":p_doge*p_cad1,
                "EURBTC":p_doge*p_eur1,
                "AEDBTC":p_doge*p_aed1,
                "INRBTC":p_doge*p_inr1,
                "PKRBTC":p_doge*p_pkr1,
            },
            time: now
        })
    }
    if(req.params.coin === "dash")
    {
        res.send({
            name: "Dash",
            symbol: "DASH",
            success: "true",
            rates: {
                "USDBTC":p_dash*p_usd1,
                "CADBTC":p_dash*p_cad1,
                "EURBTC":p_dash*p_eur1,
                "AEDBTC":p_dash*p_aed1,
                "INRBTC":p_dash*p_inr1,
                "PKRBTC":p_dash*p_pkr1,
            },
            time: now
        })
    }
    if(req.params.coin === "xmr")
    {
        res.send({
            name: "Monero",
            symbol: "XMR",
            success: "true",
            rates: {
                "USDBTC":p_xmr*p_usd1,
                "CADBTC":p_xmr*p_cad1,
                "EURBTC":p_xmr*p_eur1,
                "AEDBTC":p_xmr*p_aed1,
                "INRBTC":p_xmr*p_inr1,
                "PKRBTC":p_xmr*p_pkr1,
            },
            time: now
        })
    }
    if(req.params.coin === "usdc")
    {
        res.send({
            name: "USD Coin",
            symbol: "USDC",
            success: "true",
            rates: {
                "USDBTC":p_usdc*p_usd1,
                "CADBTC":p_usdc*p_cad1,
                "EURBTC":p_usdc*p_eur1,
                "AEDBTC":p_usdc*p_aed1,
                "INRBTC":p_usdc*p_inr1,
                "PKRBTC":p_usdc*p_pkr1,
            },
            time: now
        })
    }
    
});

app.listen(9001, function () {
    console.log('listening node app');
});