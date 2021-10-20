const customError = require('../errors/customerror')
const checkprofile = require('../middlewares/checkprofile')
const createProfile = require('../middlewares/createprofile')
const currentUser = require('../middlewares/currentuser')
const verifyUser = require('../middlewares/verifyuser')
const profileModel = require('../models/profile')
const router=require('express').Router()

router.get('/api/profile/getprofile',currentUser,verifyUser,checkprofile,createProfile,async (req,res,next)=>{
    console.log(req.currentUser.email)
    const profile= await profileModel.findOne({
        authid: req.currentUser.id
    })
    if(!profile){
        return next( new customError('profile does not exist in the database'))
    }
    res.status(200).send(profile)
})

module.exports=router