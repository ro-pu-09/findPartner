
const router=require('express').Router()
const validator=require('express-validator')

const requestValidCheck = require('../middlewares/requestvalidation')
const profileModel=require('../models/profile')
const currentUser = require('../middlewares/currentuser')
const verifyUser = require('../middlewares/verifyuser')
const checkprofile = require('../middlewares/checkprofile')
const createProfile = require('../middlewares/createprofile')
const customError=require('../errors/customerror')
const nats = require('../services/nats')
const updateProfile = require('../services/updateservice')
const getprofile = require('../services/getprofileservice')
const { json } = require('express')

router.put('/api/profile/updateprofile',currentUser,verifyUser,checkprofile,createProfile,async (req,res,next)=>{
    
    const profileBeforeUpdate=await getprofile({
        user:req.currentUser
    })

    const updatedProfile=await updateProfile({
        user:req.currentUser,
        college:req.body.college,
        techstack:req.body.techstack,
        pastproject:req.body.pastproject,
        projectidea:req.body.projectidea,
    })

    if (!updatedProfile){
        return next(new customError("error updating the profile"))
    }
    nats.publish('profile:updated',JSON.stringify(updatedProfile))
    
    res.status(200).send(updatedProfile)

    
})


module.exports= router