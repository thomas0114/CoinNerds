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
    freeForexAPI.getQuotes(['USDEUR', 'USDCAD', 'EURUSD', 'USDINR', 'USDAED', 'USDPKR'], res => {

        // console.log(res['USDPKR']['rate'])
        p_cad = 1/res['USDCAD']['rate'];
        p_usd = 1;
        p_eur = 1/res['USDEUR']['rate'];
        p_aed = 1/res['USDAED']['rate'];
        p_inr = 1/res['USDINR']['rate'];
        p_pkr = 1/res['USDPKR']['rate'];

    })
    const prices = await Binance_client.prices()
    Object.keys(prices).forEach(function (key) {

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
}, 1000)

var app = express();

app.use(cors())

app.get('/get_cyrpto_currency', function (req, res) {

    let vaules = [p_btc, p_eth, p_doge, p_dash, p_xmr, p_usdc, p_eur, p_aed, p_inr, p_pkr];
    let rates = [p_cad, p_usd,  p_eur, p_aed, p_inr, p_pkr];
    res.send({
        success: 1,
        prices: vaules,
        rates: rates,
        p_cad: p_cad,
    })
});

app.listen(9001, function () {
    console.log('listening node app');
});