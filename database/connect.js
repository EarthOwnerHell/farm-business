const mongoose = require('mongoose')
const { urlDb } = require('../settings/config.json')

const connectDb = () => (
    mongoose.connect(urlDb, (err) => {

        if (err) throw (err)
    
        console.log('--> Подключили MongoDB')
    
    })
)

module.exports = connectDb