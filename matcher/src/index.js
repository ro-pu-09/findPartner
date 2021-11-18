const mongoose= require('mongoose')
const express= require('express')

const nats=require('./core/natsstreaming')
const webSockerServer = require('./core/websoocketserver')
let serverExpress

const app=express()
start()


function start(){
    nats.getNatsClient().on('connect',()=>{
     console.log("connected to the nats --> matcher service")
     mongoose.connect('mongodb://matcher-mongo-srv:27017',(err)=>{
        if(err){
        console.log("error connecting to mongodb --> matcher service")
        }
        else{
          serverExpress=app.listen(3003)
          webSockerServer(serverExpress)
        }
     })
    })
}

