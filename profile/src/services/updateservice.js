const profileModel = require("../models/profile")

async function updateProfile(param){
    
    const updatedProfile=await profileModel.findOneAndUpdate({
        authid: param.user.id
    },
    {
        college:param.college,
        techstack:param.techstack,
        pastproject:param.pastproject,
        projectidea:param.projectidea
    },
    {
        new:true
    })
    return updatedProfile
}

module.exports= updateProfile