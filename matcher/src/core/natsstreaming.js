const nats= require('node-nats-streaming')
const crypto= require('crypto')
const errorqueue = require('../services/errorqueue')
class natsStreaming{
    constructor(){
        this.sc=nats.connect('findpartner',crypto.randomBytes(4).toString('hex'),'http://nats-srv:4222')
    }
    getNatsClient(){
        return this.sc
    }
    publish(subscription, message){
        const publishPromise=new Promise((resolve,reject)=>{
            this.sc.publish(subscription,message,(err,guid)=>{
             if(err){
                 reject(err)
             }
             else{
                 resolve(guid)
             }
        })})

        publishPromise.then((guid)=>{
            console.log("published the message --> matcher service ",guid)
        }).catch((err)=>{
            errorqueue.push({
                subscription:subscription,
                message:message
            })
        })
    }
}

module.exports= new natsStreaming()