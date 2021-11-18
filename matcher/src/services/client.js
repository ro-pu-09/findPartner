

class client{
    constructor(){
        this.clientMap=new Map()
    }
    getClient(authid){
        return this.clientMap.get(authid)
    }
    setClient(authid, client){
        this.clientMap.set(authid,client)
    }
}

module.exports= new client()
