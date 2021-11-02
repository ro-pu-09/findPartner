const customError = require('../errors/customerror')
const checkProfile = require('../middlewares/checkprofile')
const createProfile = require('../middlewares/createprofile')
const currentUser = require('../middlewares/currentuser')
const verifyUser = require('../middlewares/verifyuser')
const profileModel = require('../models/profile')

const router= require('express').Router()

router.get('/api/recommendation/',
  currentUser,
  verifyUser,
  checkProfile,
  createProfile,
  async (req,res,next)=>{
      
      const recommendedProfiles=await profileModel.find({
        liked:{
          $nin: req.profile.liked,
        },
        recommended:{
          $nin: req.profile.recommended
        },
        authid:{
          $ne: req.profile.authid
        },
        

      }).limit(20).exec(function(err,payload){
          if(err) return next(new customError("error retrieving data"))
          else res.send(payload)
          
      })
       
      
})

module.exports= router