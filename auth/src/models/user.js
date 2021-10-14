
const mongoose=require('mongoose')
const hashPasswordObj=require('../services/password')
const userScheme=mongoose.Schema({
    name:String,
    email:String,
    password: String, 
})
userScheme.set('toJSON',{
    transform: function(document, returnObj){
       returnobj=delete returnObj.password   
    }
})

userScheme.pre('save',async function(done){
    if(this.isModified('password')){
        this.password=await hashPasswordObj.encrypt(this.password)
    }
    done()
})
const userModel=mongoose.model('userAuthCollection',userScheme)

module.exports=userModel
