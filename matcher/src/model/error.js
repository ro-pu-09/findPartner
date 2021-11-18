
const mongoose = require('mongoose')

const publishErrorSchema=mongoose.Schema({
    subscription:String,
    message:String
})

const publishErrorModel=mongoose.model('publisherror',publishErrorSchema)

module.exports=publishErrorModel