const jwt=require('jsonwebtoken')
const customError=require('../errors/customerror')
const currentUser=(req,res,next)=>{
     if(!req.session.auth){
        return next(new customError('no user present'))
     }
     req.currentUser=req.session.auth
     next()
}

module.exports=currentUser