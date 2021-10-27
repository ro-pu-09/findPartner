const express=require('express')
const mongoose=require('mongoose')
const cookieSession = require('cookie-session')

const updateProfileRouter=require('./routes/updateprofile')
const getProfileRouter=require('./routes/getprofile')
const errors = require('./middlewares/errors')
const natsServer = require('./services/nats')

const app=express()
app.set('trust-proxy',true)

app.use(cookieSession({
   name:'authSession',
   secure:false,
   signed:false
}))

app.use(express.json())


app.use(updateProfileRouter)
app.use(getProfileRouter)
app.use(errors)

async function start(){

    natsServer.getNatsClient().on('connect',()=>{
        console.log("connected to nats")
        mongoose.connect('mongodb://profile-mongo-srv:27017/users').then((response)=>{
        console.log("connected to mongo db --> profile service")

        
            app.listen(3001,()=>{
                console.log("profile service listening at port 3001")
               })
            
        }).catch((err)=>{
        console.log(err)
        })
    })
}

start()

