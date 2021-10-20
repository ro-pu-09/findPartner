const customError = require("../errors/customerror")


const currentUser=(req,res,next)=>{
    //console.log(req.session.auth,"--> profile service")
    if (!req.session.auth){
        throw new customError("No user present")
    }
    
    req.currentUser=req.session.auth
    next()
}

module.exports=currentUser