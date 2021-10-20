const customError = require("./customerror");


class RequestValidationError extends customError{
    constructor(errors){
      super(errors[0])
      super.setStatusCode(404)
    }
    normaliseError(){
        return this.errors.map(error=>{
            return {
                message: error.msg,
                param:error.param
            }
        })
    }
}
module.exports=RequestValidationError