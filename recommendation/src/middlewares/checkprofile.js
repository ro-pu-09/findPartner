const profileModel = require("../models/profile")
const checkProfileSrv = require("../services/checkprofilesrv")
const customError= require('../errors/customerror')

const checkProfile=async (req,res,next)=>{
    
    req.profile =await checkProfileSrv(req.currentUser.id) 
    next() 
}

module.exports=checkProfile