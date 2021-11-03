const express=require('express') 
const cookieSessioon=require('cookie-session')
const mongoose=require('mongoose')

const nats=require('./services/nats')
const errorhandling = require('./middlewares/errors')
const recommedationRouter=require('./routes/getrecommendation')


const app=express()
app.use(express.json())
app.set('trust-proxy',true)
app.use(cookieSessioon({
    name:'authSession',
    signed:false,
    secure:false
}))


app.use(recommedationRouter)
app.use(errorhandling)


function start(){
    nats.natsServer.getNatsClient().on('connect',()=>{

       mongoose.connect('mongodb://recommendation-mongo-srv:27017').then((response)=>{
           console.log("mongodb connected --> recommendation service")
           app.listen(3002,()=>{
            //natsServer.subscribe('profile:updated','')
            setSubscriptions()

            console.log('listening in 3002')
           })
        }).catch((err)=>{
            console.log("error connecting to mongodb --> recommendation service")
        })
        
    })
}

function setSubscriptions(){
      const client=nats.natsServer.getNatsClient()
      const options= nats.natsServer.getOptions()
      new nats.natsSubscriptionSet(client,options,'updateProfileDurable','updateProfileQueueGrp','profile:updated')
}

start()




