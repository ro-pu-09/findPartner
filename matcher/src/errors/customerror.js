


class customError extends Error{
       constructor(socket,message){
           super(message)
           this.statusCode=400
           this.socket=socket
           this.message=message
          
       }
       setStatusCode(statusCode){
          this.statusCode=statusCode
       }
       sendError(){
        this.socket.write('HTTP/1.1 401 ' +this.message+'\r\n'+
             'Upgrade: WebSocket\r\n' +
             'Connection: Upgrade\r\n' +
            '\r\n');
        
        this.socket.destroy();
       }
}

module.exports=customError