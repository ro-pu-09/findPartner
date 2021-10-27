const natsStreaming=require('node-nats-streaming')
const crypto=require('crypto')
const customError = require('../errors/customerror')
const util = require('util')
const errorqueue = require('./errorqueue')


class natsServer{
  
  constructor(){
    this.sc=natsStreaming.connect('findpartner',crypto.randomBytes(4).toString('hex'),'http://nats-srv:4222')
  }

  getNatsClient(){
     return this.sc
  }
  


   publish(subscription,message){
     const response =new Promise((resolve, reject)=>{
         this.sc.publish(subscription,message,(err,guid)=>{
            if(err){
              reject(err)
            }
            else{
              resolve (guid)
            }
         })
     })

     response.then((guid)=>{
        console.log("updated profile published --> profile service ,",guid)
     },(err)=>{
        errorqueue.addError({
           subscription,
           message
        })
     })
     return
  }
  
}

module.exports = new natsServer()




