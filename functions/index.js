const functions = require('firebase-functions');

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const request = require('request-promise')
const token = '92BF73718302430D90915994E3EE9781'
const email = 'matheusouzatj@gmail.com'
const parse = require('xml2js').parseString

const checkoutUrl = 'https://pagseguro.uol.com.br/v2/checkout/payment.html?code='

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req,res)=>{
    res.send('Server side')
})

app.post('/donate',(req,res)=>{
    request({
        uri: 'https://ws.pagseguro.uol.com.br/v2/checkout?',
        method: 'POST',
        form:{
            token: token,
            email: email,
            currency: 'BRL',
            itemId1: 'idCampanha',
            itemDescription1: 'Doação',
            itemQuantity1: '1',
            itemAmount1: '2.00'
        },
        headers:{
            'Content-Type': 'application/x-www-urlencode; charset=UTF8'
        }
    })
    .then(data=>{
        parse(data, (err,json)=>{
            res.send({
                url: checkoutUrl+json.checkout.code[0]
            })
        })
    })
})

exports.api = functions.https.onRequest(app)