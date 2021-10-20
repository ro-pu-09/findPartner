const express=require('express')
const customError = require('./errors/customError')
const RequestValidationError = require('./errors/requestvalidationerror')

const errorHandler = require('./middlewares/errors')
const signupRouter=require('./routes/signup')
const signinRouter=require('./routes/signin')
const currentuserRouter=require('./routes/currentuser')
const signoutRouter=require('./routes/signout')

const mongoose=require('mongoose')
const cookiesession =require('cookie-session')


const app=express()
app.set('trust-proxy',true)


app.use(cookiesession({
    name:'authSession',
    signed:false,
    secure:false,
}))

app.use(express.json())



app.use(signupRouter)
app.use(signinRouter)
app.use(currentuserRouter)
app.use(signoutRouter)
app.use(errorHandler)


function startup(){
    mongoose.connect('mongodb://mongo-depl-srv:27017/auth').then(()=>{
      console.log("DB connected")
       app.listen(3000,()=>{
        console.log("auth service of findPartner listening to port 3000...")
       })
    }).catch((err)=>{
     console.log(err);
    })
    
}

startup()
