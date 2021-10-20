
const mongoose=require('mongoose')

const userScheme=mongoose.Schema({
    authid:String,
    name:String,
    email:String,
    college:String,
    techstack:[String],
    pastproject: [String],
    projectidea:[String],
})
const profileModel=mongoose.model('userProfileCollection',userScheme)

module.exports=profileModel
