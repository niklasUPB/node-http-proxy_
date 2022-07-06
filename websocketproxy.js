var util = require('util');
var http = require('http');
var httpProxy = require('http-proxy');
var i = 0;
var received = [0,0,0];
var send = [0,0,0];
var arguments = process.argv
var name = arguments[2]
var dellay = arguments [3]
var fs = require('fs');
var out = "";


try {
  var io = require('socket.io'),
      client = require('socket.io-client');
}


catch (ex) {
  console.error('Socket.io is required for this example:');
  console.error('npm ' + 'install'.green);
  process.exit(1);
}

//for debugging only
function print (printable){
   console.log("====");
   console.log("====");
   console.log("====");
   console.log("====");
   console.log(printable);
}

//
// Create the target HTTP server and setup
// socket.io on it.
//

//
// Setup our server to proxy standard HTTP requests
//
var proxy = new httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: 9005
  }
});


var proxyServer = http.createServer(function (req, res) {
    proxy.web(req, res);
});

//
// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.
//
proxyServer.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
});



proxy.on('close' ,function (res,socket,head) {
    send [i] = socket.bytesRead;
    received [i] = socket.bytesWritten;
    out = out + send[i].toString()  + ","
    i = i+1;
    if(i==2){
      proxyServer.close(function( 
         ){
            fs.appendFile(name, out, err => {
              if (err) {
                console.error(err);
              }
             } );
         });
    }
});



proxyServer.listen(9000);