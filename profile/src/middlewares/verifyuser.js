const jwt = require('jsonwebtoken')
const customError = require('../errors/customerror')

const verifyUser=(req,res,next)=>{
    
    try{
        req.currentUser=jwt.verify(req.currentUser,'theSecret')
        
    }
    catch (err){
        throw new customError("user could not be verified")
    } 

    next()
}

module.exports= verifyUser