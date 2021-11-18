
const mongoose= require('mongoose')

const matchSchema=mongoose.Schema({
    p1:String,
    p2: String,
    times:{
        type: Number,
        default:0
    }
})

const matchModel= mongoose.model('matchCollection',matchSchema)

module.exports=matchModel