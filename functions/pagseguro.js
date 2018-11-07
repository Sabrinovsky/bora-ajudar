const request = require('request-promise')
const token = '92BF73718302430D90915994E3EE9781'
const email = 'matheusouzatj@gmail.com'
const parse = require('xml2js').parseString

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
        console.log(json.checkout.code[0])
    })
})