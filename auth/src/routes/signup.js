const router = require('express').Router()
const validator =require('express-validator')
const  mongoose= require('mongoose')
const customError=require('../errors/customError')
const RequestValidationError = require('../errors/requestvalidationerror')
const user = require('../models/user')
const jwt=require('jsonwebtoken')
const password = require('../services/password')
router.post('/api/users/signup',

    validator.body('email').isEmail(),

    validator.body('password').isLength({min:5}),

    validator.body('name').notEmpty(),

    async (req,res,next)=>{
      
       const errors = validator.validationResult(req)
       if(!errors.isEmpty()){
           return next(new RequestValidationError(errors.array()))
           //console.log(newobj.normaliseError())
       }
       
        
        const newuser= new user({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
         })
       
        
        await newuser.save()
        
        const Jtoken=jwt.sign({
            id:newuser.id,
            name:newuser.name,
            email:newuser.email
        },'theSecret')

        req.session={
           auth:Jtoken
        }
       //console.log("signup post service");
       res.status(200).send(newuser)
})

module.exports=router