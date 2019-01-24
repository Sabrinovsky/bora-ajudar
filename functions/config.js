const prod = {
    token: '92BF73718302430D90915994E3EE9781',
    email: 'matheusouzatj@gmail.com',
    pagseguro:{
        uri: 'https://ws.pagseguro.uol.com.br/v2/checkout?',
        checkoutUrl: 'https://pagseguro.uol.com.br/v2/checkout/payment.html?code=',
        notificationUrl: 'https://ws.pagseguro.uol.com.br/v2/transactions/notifications/'
    }
    
}

const dev = {
    token: '92BF73718302430D90915994E3EE9781',
    email: 'matheusouzatj@gmail.com',
    pagseguro:{
        uri: 'https://ws.pagseguro.uol.com.br/v2/checkout?',
        checkoutUrl: 'https://pagseguro.uol.com.br/v2/checkout/payment.html?code=',
        notificationUrl: 'https://ws.pagseguro.uol.com.br/v2/transactions/notifications/'
    }
}

const config = process.env.NODE_ENV === 'development'  ?
                    dev :
                    prod
                    
export default {...config}
