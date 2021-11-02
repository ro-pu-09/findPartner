const profileModel = require("../models/profile")


const checkProfileSrv=async (authid)=>{
    const profile = await profileModel.findOne({
        authid:authid
    })
    console.log("inside check profile srv, ", profile)
    return profile
}

module.exports = checkProfileSrv
