const profileModel = require("../models/profile")
const createProfileSrv = require("../services/createprofilesrv")

const createProfile=async(req,res,next)=>{
    req.profile=await createProfileSrv(req.profile,req.currentUser.id,req.currentUser.email,req.currentUser.name);
    next()
}

module.exports=createProfile