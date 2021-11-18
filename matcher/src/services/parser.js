const customError = require("../errors/customerror")
const storeQueue= require('./queue')

class Parser{
    constructor(){
      this.parseInit=this.parseInit.bind(this)
      this.parseBody=this.parseBody.bind(this)
      this.reOrder=this.reOrder.bind(this)
      this.pushToStore=this.pushToStore.bind(this)
    }
    
    parseInit(message,ws){
        this.message=message
        this.parseBody()
        this.ws=ws
    }

    parseBody(){
        this.jsonBody=JSON.parse(this.message)
        this.first=this.jsonBody.liked
        this.second=this.jsonBody.lBy
        this.reOrder()
    }

    reOrder(){
        //console.log(typeof this.first)
        if(this.first.localeCompare(this.second)==-1){
            const temporarySwap=this.second
            this.second=this.first
            this.first=temporarySwap
        }
        else if(this.first.localeCompare(this.second)==0){
            throw new customError("both liked and likedby cannot be the same authid")
        }
        else{
            this.first=this.first
            this.second=this.second
        }
        this.pushToStore()
    }

    pushToStore(){
        console.log("pushing to store --> matcher service ,",this.first, this.second)
        storeQueue.push({
            first:this.first,
            second:this.second,
            liked:this.jsonBody.liked,
            lby:this.jsonBody.lby,
            ws:this.ws
        })

    }


}


module.exports={
    parse:new Parser().parseInit
}