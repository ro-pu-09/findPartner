const customError = require("../errors/customError");


const errorHandler=(err,req,res,next)=>{
   if(err instanceof customError){
     res.status(err.statusCode).send(err.normaliseError())
   }   
   else{
   res.status(404).send([
   {
      message:err
   }
   ])
   }
};

module.exports=errorHandler