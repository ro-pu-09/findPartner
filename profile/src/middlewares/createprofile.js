const profileModel = require("../models/profile")


const createProfile=async (req,res,next)=>{
    if(!req.profile){
        const newProfile= new profileModel({
            authid:req.currentUser.id,
            email:req.currentUser.email,
            name:req.currentUser.name,
        })
        await newProfile.save()
        req.profile=newProfile
    }
    console.log(req.profile)
    next()
}

module.exports=createProfile