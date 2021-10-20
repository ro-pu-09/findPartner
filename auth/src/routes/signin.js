
const router=require('express').Router()
const validator=require('express-validator')
const customError = require('../errors/customError')
const RequestValidationError=require('../errors/requestvalidationerror')
const userModel = require('../models/user')
const password = require('../services/password')
const jwt=require('jsonwebtoken')
const RequestHandler=require('../middlewares/requestvalidation')
router.post('/api/users/signin',
      validator.body('email').isEmail(),
      validator.body('password').trim().isLength({min:5}),
      RequestHandler,
     
     async (req,res,next)=>{
       
       const existingUser=await userModel.findOne({
           email:req.body.email
       })

       if (!existingUser){
           const userExistanceError=new customError('User does not exist')
           userExistanceError.setStatusCode(406)
           return next(userExistanceError)
       }
      
       const passwordTruth=await password.compare(req.body.password, existingUser.password)
       console.log(passwordTruth)
       if(passwordTruth)
       { 
           const Jtoken=jwt.sign({
               id:existingUser._id,
               email:existingUser.email,
               name:existingUser.name
           },'theSecret')
           req.session={
               auth:Jtoken
           }

           res.status(200).send(existingUser)
       }
       else{
          const authError=new customError('Authentication failed')
          authError.setStatusCode(410)
          return next(authError)
       }


})

module.exports=router