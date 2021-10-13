const router = require('express').Router()
const validator =require('express-validator')
const customError=require('../errors/customError')
const RequestValidationError = require('../errors/requestvalidationerror')
router.post('/api/users/signup',

    validator.body('email').isEmail(),

    validator.body('password').isLength({min:5}),

    (req,res,next)=>{
      
       const errors = validator.validationResult(req)
       if(!errors.isEmpty()){
           throw new RequestValidationError(errors.array())
           //console.log(newobj.normaliseError())
       }
       
       console.log("signup post service");
       res.status(200).send("perfect email and password")
})

module.exports=router