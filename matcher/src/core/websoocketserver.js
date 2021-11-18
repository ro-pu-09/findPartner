const websocket=require('ws')
const customError=require('../errors/customerror')
const jwt=require('jsonwebtoken')
const clientMap= require('../services/client')
const {parse}=require('../services/parser')


function webSockerServer(serverExpress){

    serverExpress.on('upgrade', async (req, socket, head)=>{
        
       if(!req.headers.cookie){
             console.log("no cookie --> matcher service")
             new customError(socket,"no session cookie detected.closing upgrade request").sendError()
       }
       else{
         const cookie=req.headers.cookie
         const decodedCookie=Buffer.from(cookie,'base64').toString('ascii')
         try{
             console.log("decoded cookie --> matcher service",decodedCookie)
             const payload=jwt.verify(JSON.parse(decodedCookie).auth,'theSecret')
             
             req.payload=payload
             const client = payload;
             wss.handleUpgrade(req,socket,head,function (ws){
                   clientMap.setClient(payload.authid,ws)
                   wss.emit('connection',ws,req,client)
                })
             
         }
         catch(err){
              new customError(socket,"user verfication failed. closing upgrade request").sendError()
         }
       }
    })
 
 
    const wss=new websocket.WebSocketServer({
    noServer:true
    })
 
 
 
    wss.on('connection',(ws,req,client)=>{
        console.log('connected')
        clientMap.getClient(req.payload.authid).send("hello. welcome "+req.payload.name)
 
        ws.on('message', (message) => {
            parse(message.toString(),ws)
        });

        ws.on('error',console.error)
    })
 
 
 
    wss.on('close',()=>{
       console.log("closed connection");
    })

}

module.exports=webSockerServer