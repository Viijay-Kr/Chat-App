var http=require("http");
var express=require("express");
var app=express();
var server=http.createServer(app);
server.listen(8080);
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
})
app.use(express.static("Public/"));
var client=require("socket.io").listen(server);
client.on("connection",function(socket){
	toclient=function(msg){
		client.emit("toClient",msg);
	};
	socket.on("toserver",function(data){
		var options={};
    var ip=socket.conn.remoteAddress.split(":")[3];
    options={
      "data":data.data,
      "client":ip
    };
		toclient(options);
	});
	socket.on("status",function(status){
          var clientConn;
          var ip=socket.conn.remoteAddress.split(":")[3];
          var statusTosend={
          	"data":status.data,
          	"client":ip
          }
          client.emit("sendStatus",statusTosend);
	})
})
