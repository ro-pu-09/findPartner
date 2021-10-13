const express=require('express')
const customError = require('./errors/customError')
const RequestValidationError = require('./errors/requestvalidationerror')
const errorHandler = require('./middlewares/errors')
const signupRouter=require('./routes/signup')


const app=express()
app.use(express.json())


app.use(signupRouter)
app.use(errorHandler)
app.listen(3000,()=>{
    console.log("auth service of findPartner listening to port 3000...")
})