

const router =require('express').Router()

router.post('/api/users/signout',(req,res,next)=>{
    req.session=null
    res.send({signout:true})
})

module.exports=router