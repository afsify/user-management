const mongoose = require('mongoose')


mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection

connection.on('connected', () => {

    console.log('MongoDB is Connected')

})

connection.on('error', (error) => {

    console.log('Error in MongoDB Connection', error)

})


module.exports = mongoose