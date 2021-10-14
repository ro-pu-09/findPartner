
class customError extends Error{
    statusCode
    constructor(message){
        super(message)
        this.message = message
        this.statusCode=400
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