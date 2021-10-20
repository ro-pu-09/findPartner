

class customError extends Error{
    constructor(message){
        super(message)
        this.statusCode=400
    }
    setStatusCode(statusCode){
      this.statusCode=statusCode
    }
    getStatusCode(){
        return this.statusCode
    }
    normaliseError(){
        return [{
            message:this.message
        }]
    }
}

module.exports=customError