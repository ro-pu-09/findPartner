const nats=require('node-nats-streaming')
const crypto=require('crypto')
const subscribeObj = require('./subscription')

class natsServer{
    constructor(){
       this.sc=nats.connect('findpartner',crypto.randomBytes(4).toString('hex'),'http://nats-srv:4222')
       this.options= this.sc.subscriptionOptions()
       this.options.setManualAckMode(true)
    }
    getNatsClient(){
        return this.sc
    }
    setOptions(waitTime){  // add additional options when required...
        this.options.setAckWait(waitTime)
    }
    subscribe(subscription){
        console.log()
        const subs =this.sc.subscribe(subscription,this.options)
        subs.on('message',(msg)=>{
            console.log("received message --> recommendation service ",msg.getData())
            subscribeObj.routeSubscriptons(subscription,msg)
        })
    }
}

module.exports= new natsServer()