const jwt= require('jsonwebtoken')
const customError=require('../errors/customerror')

const verifyUser=(req,res,next)=>{
    const verifyPromise=new Promise((resolve,reject)=>{
        jwt.verify(req.currentUser,'theSecret',(err,payload)=>{
           if(err) reject(err)
           else resolve(payload)
        })
    })

    verifyPromise.then((payload)=>{
       req.currentUser=payload
       next()
    },
    (err)=>{
        return next(new customError('user could not be verified'))
    })

}
module.exports=verifyUser