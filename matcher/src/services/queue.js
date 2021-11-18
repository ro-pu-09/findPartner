const natsstreaming = require("../core/natsstreaming")
const Queue = require("../core/queue")
const matchModel = require("../model/matches")



class storeQueue extends Queue{
    constructor(){
        super()
    }

    push(element){
        this.q.push(element)
        this.next()
    }
    next(){
        if(this.present<this.limit && this.size()!=0){
            this.present++
            //console.log("received the message --> matcher service",this.pop())
            const message = this.pop()
            matchModel.findOneAndUpdate({
                p1:message.first,
                p2:message.second,
            },
            {
                $inc: {
                    times: 1
                }
            },
            {
                upsert:true,
                new:true
            },
            (err,doc)=>{
                if (doc.times>=2){
                    console.log("matched")
                    message.ws.send('matched')
                }
                else{
                    natsstreaming.publish('profile:Liked',JSON.stringify({
                        liked:message.liked,
                        lby:message.lby
                    }))
                    console.log("published message --> matcher service")
                }
                this.present--;
                this.next()
            })
        }
    }
}
module.exports=new storeQueue()
 