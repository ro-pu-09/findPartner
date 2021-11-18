
class Queue{
    constructor(){
        this.q=[]
        this.limit=1
        this.present=0
       
    }

    push(element){
        this.q.push(element)
    }
    
    pop(){
        return this.q.shift()
    }
   
    size(){
        return this.q.length
    }
}

module.exports=Queue

