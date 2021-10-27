
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

userScheme.pre('findOneAndUpdate',function(next){
   this.update({},{
       $inc:{
           __v:1
       }
   },
   next())
})

const profileModel=mongoose.model('userProfileCollection',userScheme)

module.exports=profileModel
