
const router=require('express').Router()
const requestValidCheck = require('../middlewares/requestvalidation')
const profileModel=require('../models/profile')
const validator=require('express-validator')
const currentUser = require('../middlewares/currentuser')
const verifyUser = require('../middlewares/verifyuser')
const checkprofile = require('../middlewares/checkprofile')
const createProfile = require('../middlewares/createprofile')
const customError=require('../errors/customerror')

router.put('/api/profile/updateprofile',currentUser,verifyUser,checkprofile,createProfile,async (req,res,next)=>{
   
    const updatedProfile=await profileModel.findOneAndUpdate({
        authid: req.currentUser.id
    },
    {
        college:req.body.college,
        techstack:req.body.techstack,
        pastproject:req.body.pastproject,
        projectidea:req.body.projectidea
    },
    {
        new:true
    })

    if (!updatedProfile){
        return next(new customError("error updating the profile"))
    }

    res.status(200).send(updatedProfile)
})


module.exports= router