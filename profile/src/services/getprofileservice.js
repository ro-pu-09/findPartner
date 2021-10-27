const profileModel = require("../models/profile");

async function getprofile(param){
    const profile= await profileModel.findOne({
        authid: param.user.id
    })
    return profile
} 

module.exports=getprofile