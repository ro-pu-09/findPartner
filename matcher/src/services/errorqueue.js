const publishErrorModel = require("../model/error")


const Queue=require('../core/queue')

class errorQueue extends Queue{
   constructor(){
       super()
   }

   push(error){
       this.q.push(error)
       this.next()
   }

    next(){
       if(this.present<this.limit && this.q.length!=0){
           const error = this.q.shift()
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