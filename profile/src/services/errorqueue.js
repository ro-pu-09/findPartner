const publishErrorModel = require("../models/error")
const { subscribe } = require("../routes/updateprofile")
const nats = require("./nats")


class errorQueue{
   constructor(){
       this.limit=2
       this.present=0
       this.eQueue=[]
   }

   addError(error){
       this.eQueue.push(error)
       this.next()
   }

   async next(){
       if(this.present<this.limit && this.eQueue.length!=0){
           const error = this.eQueue.shift()
           this.present++;
           const errorSaved=new publishErrorModel({subscription:error.subscription,message:error.message})
           errorSaved.save().then((response)=>{
             this.present--;
             this.next()
             return response;
           })
           console.log("error queue append --> profile service, ",errorSaved)
        }
   }
}

module.exports= new errorQueue()