const customError = require("../errors/customerror")

const error=(err,req,res,next)=>{
      if(err instanceof customError){
          res.status(err.statusCode).send(err.normaliseError())
      }
      else{
          console.log(err)
          res.status(404).send([{
              message:"unkown error detected"
          }])
          
      }

}


module.exports = error