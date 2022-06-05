const mongoose = require('mongoose')
const { urlDb } = require('../settings/config.json')
const { SettingsModel } = require('./models')
const connectDb = () => (
    mongoose.connect(urlDb, (err) => {

        if (err) throw (err)
    
        console.log('--> Подключили MongoDB')
    
    }),
    SettingsModel.find().then(res => {
        if (!res.length) {
          SettingsModel.insertMany([
            { name: 'roundDuration', value: 40 },
            { name: '$', value: 0 },
      
          ])
        }
      })
)

module.exports = connectDb
