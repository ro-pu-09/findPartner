const profileModel = require("../models/profile")

const checkprofile=async (req,res,next)=>{
    
    const profile=await profileModel.findOne({
        authid:req.currentUser.id
    })
    
    req.profile=profile
    next()
}

module.exports=checkprofile