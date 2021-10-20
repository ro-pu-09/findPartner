

const router=require('express').Router()
const jwt=require('jsonwebtoken')
const customError = require('../errors/customError')

router.get('/api/users/currentuser',(req,res,next)=>{
    if(!req.session.auth){
        res.send({
            currentuser:null
        })
    }
    
    try{
        const payload=jwt.verify(req.session.auth,'theSecret')
        res.send(payload)
    }

    catch(err){
        throw new customError('invalid signin. try again')
    }
    
})


module.exports=router