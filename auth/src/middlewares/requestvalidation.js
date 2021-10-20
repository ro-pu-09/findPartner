
const e = require('express');
const validator=require('express-validator')
const RequestValidationError=require('../errors/requestvalidationerror')
const RequestHandler=(req,res,next)=>{
    const errors=validator.validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array())
        next(new RequestValidationError(errors.array()))
    }
    
    else  next()
}

module.exports=RequestHandler