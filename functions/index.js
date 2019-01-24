const functions = require('firebase-functions');
const admin = require('firebase-admin')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const config = require('./config');

const configPagseguro = config.pagseguro;

app.use(cors({origin: true}));
admin.initializeApp(functions.config().firebase)
// admin.initializeApp()

const request = require('request-promise')
const parse = require('xml2js').parseString


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/api', (req,res)=>{
    res.send('Server side')
})

app.post('/donate',(req,res)=>{
    // rveconsole.log(req.body)
    request({
        uri: configPagseguro.uri,
        method: 'POST',
        form:{
            token: config.token,
            email: config.email,
            currency: 'BRL',
            itemId1: req.body.idCampanha,
            itemDescription1: req.body.nome,
            itemQuantity1: '1',
            itemAmount1: req.body.valor
        },
        headers:{
            'Content-Type': 'application/x-www-urlencode; charset=UTF8',
            'Access-Control-Allow-Origin' : '*'
        }
    })
    .then(data=>{
        parse(data, (err,json)=>{
            res.send({
                url: configPagseguro.checkoutUrl+json.checkout.code[0]
            })
        })
    })
    .catch(err=>{
        res.send(err)
    })
    
})

app.post('/webhook', (req,res)=>{
    
    const notificationCode = req.body.notificationCode

    request(configPagseguro.notificationUrl+notificationCode+'?token='+config.token+'?email='+config.email)
    .then( xml =>{
        parse(xml, (err, transactionJson)=>{
            const transaction = transactionJson.transaction
            const status = transaction.status[0]
            const amount = transaction.grossAmount[0]
            const campanha = transaction.items[0].item[0].id[0]

            //Atualizando valores da campanha no banco
            admin
            .database()
            .ref('/campaigns/'+campanha)
            .once('value')
            .then(value=> {
                const campanhaAtual = value.val()
                const arrecadado = parseFloat(campanhaAtual.arrecadado) + parseFloat(amount)
                campanhaAtual.arrecadado = arrecadado.toFixed(2)
            
            admin
                .database()
                .ref('/campaigns/'+campanha)
                .set(campanhaAtual)
                .then(()=>{
                    res.send(campanhaAtual)
                })
    
            })
            //Salvando transação no banco
            admin
                .database()
                .ref('/transactions/'+transaction.code[0])
                .set(transaction)
                .then(()=>{
                    
                })
                          
            res.send('ok')
        })
    })

})

exports.api = functions.https.onRequest(app)