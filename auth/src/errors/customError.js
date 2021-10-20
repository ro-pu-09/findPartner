
class customError extends Error{
    statusCode
    constructor(message){
        super(message)
        this.message = message
       //console.log("this of the custom error-->",Object.getPrototypeOf(this)===customError.prototype)
        
        this.message=message
       
    }
    normaliseError(){
        return [{
            message:this.message,
        }]
    }
}
module.exports=customError