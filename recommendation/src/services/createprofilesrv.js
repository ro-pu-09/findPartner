const profileModel = require("../models/profile")

const createProfileSrv =async (savedProfile, authid, email, name)=>{
    if (!savedProfile){
        console.log("inside the create profile")
        const newProfile= new profileModel({
            authid:authid,
            email:email,
            name: name,
        })
        await newProfile.save()
        savedProfile=newProfile
    }
    
   return savedProfile
}

module.exports=createProfileSrv