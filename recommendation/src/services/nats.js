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
    getOptions(){
        return this.options
    }
}


class natsSubscriptionSet {
    constructor(client,options,durableName,queueGroup,subscription,waitTime){
        if (waitTime) options.setAckWait(waitTime)
        options.setDeliverAllAvailable()
        options.setDurableName(durableName)
        this.client=client
        this.options=options
        this.queueGroup=queueGroup
        this.subscription=subscription
        this.subscribe()
    }

    subscribe(){
        console.log("Listening for "+this.subscription)
        const subs =this.client.subscribe(this.subscription,this.queueGroup,this.options)
        subs.on('message',(msg)=>{
            console.log("received message --> recommendation service ",msg.getData())
            subscribeObj.routeSubscriptons(this.subscription,msg)
        })
    }
    
}

module.exports={
    natsServer:new natsServer(),
    natsSubscriptionSet:natsSubscriptionSet
}
