const customError = require("./customError");

class RequestValidationError extends customError{
   constructor(errorsArray){
       super("request validation error")
       super.statusCode=404
       console.log(this.statusCode)
       this.errorsArray=errorsArray
       
   }
   normaliseError(erar){
       return this.errorsArray.map(error=>{
           return {
               message:error.msg,
               fields:error.param
           }
       })
   }
}

module.exports=RequestValidationError