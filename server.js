const express = require('express')
const app = express()
const db = require('./db')

app.use(express.json())
app.use(express.static('client'))

db.connect()
    .then(() => {


        require('./router')(app)
        console.log('my server running');

        app.listen(3000)
    })