const request = require('request-promise');
const parse = require('xml2js').parseString;
const config = require('./config');

// request({
//     uri: 'https://ws.pagseguro.uol.com.br/v2/checkout?',
//     method: 'POST',
//     form:{
//         token: token,
//         email: email,
//         currency: 'BRL',
//         itemId1: 'idCampanha',
//         itemDescription1: 'Doação',
//         itemQuantity1: '1',
//         itemAmount1: '2.00'
//     },
//     headers:{
//         'Content-Type': 'application/x-www-urlencode; charset=UTF8'
//     }
// })
// .then(data=>{
//     parse(data, (err,json)=>{
//         console.log(json.checkout.code[0])
//     })
// })

request({
    uri: config.pagseguro.uri,
    method: 'POST',
    form:{
        token: config.token,
        email: config.email,
        currency: 'BRL',
        itemId1: 'idCampanha',
        itemDescription1: 'Doação',
        itemQuantity1: '1',
        itemAmount1: '2.00'
    },
    headers:{
        'Content-Type': 'application/x-www-urlencode; charset=UTF8',
        'Access-Control-Allow-Origin': '*'
    } 
})
.then(data=>{
    parse(data, (err,json)=>{
       console.log(json)
    })
})

// app.post('/webhook', (req,res)=>{
    // const notificationUrl = 'https://ws.pagseguro.uol.com.br/v2/transactions/notifications/'
    // const notificationCode = '16DAD7-F881F581F58B-F004753FA1D8-578837'

    // request(notificationUrl+notificationCode+'?token='+token+'?email='+email)
    // .then( xml =>{
    //     parse(xml, (err, transactionJson)=>{
    //         const transaction = transactionJson.transaction
    //         const status = transaction.status[0]
    //         const amount = transaction.grossAmount[0]
    //         const campaign = transaction.items[0].item[0].id[0]
    //         console.log(status,amount,campaign)
    //     })
    // })


// })