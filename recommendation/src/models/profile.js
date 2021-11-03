const mongoose=require('mongoose')

const profileSchema=mongoose.Schema({
    authid: String,
    email:String,
    name: String,
    profile: String,
    college:String,
    liked:[String],
    recommended:[String]
})

profileSchema.set('toJSON',{
    transform:(doc, ret)=>{
        delete ret.liked
        delete ret.recommended
    }
})

const profileModel=mongoose.model('userprofile',profileSchema)

module.exports=profileModel
