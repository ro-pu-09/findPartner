const customError = require("../errors/customerror")


const errors=(err,req,res,next)=>{
    if (err instanceof customError){
        res.status(err.getStatusCode()).send(err.normaliseError())
    }
    else{
        res.status(400).send("Unknown error detected")
    }
}

module.exports=errors
