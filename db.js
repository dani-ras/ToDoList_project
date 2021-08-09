const mongoose = require('mongoose')
require('dotenv').config()

const
    // username = 'Admin',
    // password = 'TaNvabG6L5egPHIQ',
    username = process.env.username,
    password = process.env.password,
    connectionString = `mongodb+srv://${username}:${password}@cluster0.nno1i.mongodb.net/TODOlist?retryWrites=true&w=majority`

exports.connect = async function connect() {
    try {
        // console.log(username, password, connectionString);
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        // success
        console.log('Mongo connected');

    } catch (error) {
        console.error('Not Connected', error.message)
    }
}
