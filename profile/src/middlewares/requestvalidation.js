

const validator = require('express-validator')
const RequestValidationError = require('../errors/requestvalidationerror')

const requestValidCheck=(req,res,next)=>{
 const errors=validator.validationResult(req)
    if (!errors.isEmpty()){
        throw RequestValidationError(errors.array())
   }
   next()
}

module.exports=requestValidCheck