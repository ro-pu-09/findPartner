const profileModel = require("../models/profile");
const checkProfileSrv=require('./checkprofilesrv')
const createProfileSrv=require('./createprofilesrv')

class subscription {
    
    routeSubscriptons(subscription, msg){
        switch(subscription){
            case 'profile:updated': this.updateProfileFunc(msg)
            break
            case 'like:created':this.updateLikesFunc(msg)
            break
        }
    }

    async updateProfileFunc(msg){
        const updateProfile=JSON.parse(msg.getData())
        const savedProfile=await checkProfileSrv(updateProfile.authid)
        console.log("saved profile --> recommendation service ", savedProfile)
        await createProfileSrv(savedProfile,updateProfile.authid,updateProfile.email, updateProfile.name)
        const newProfile=await profileModel.findOneAndUpdate({
            __v:{$lte : updateProfile.__v},
            authid: updateProfile.authid
        },{
            profile: JSON.stringify(updateProfile),
            __v: updateProfile.__v
        },
        {
            new:true
        })

        console.log("new profile --> recommendations service ",newProfile)
       
        msg.ack()
        console.log("Acknowledged msg...")
      
    }
    async updateLikesFunc(msg){
        const updateLikes = JSON.parse(msg.getData)
        const updatedLikes= await profileModel.findOneAndUpdate({
            authid:updateLikes.authid
        },
        {
            $push:{
                liked:updateLikes.liked
            }
        },
        {
            new:true
        })
        console.log("added to the likes --> recommendation service ",updatedLikes)
        msg.ack()

    }
}

module.exports= new subscription()