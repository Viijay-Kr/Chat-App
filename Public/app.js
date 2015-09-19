(function(){
  var socket=io.connect();
  var data;
  if(socket!==undefined){
    //Listen for server
    socket.on("sendStatus",function(data){
     if(data.client!==window.location.host.split(":")[0]) 
      document.getElementById("status").textContent=data.data;
    });
    socket.on("toClient",function(data){
      var div=document.createElement("div");
      var br=document.createElement("br");
      div.style.display="block";
      div.style.width="250px";
      div.textContent=data.data;
      div.style.padding="0 10px 0px 4px";
      document.getElementById("chat-message").appendChild(div);
      document.getElementById("chat-message").appendChild(br);
      if(data.client==window.location.host.split(":")[0])
      {
        div.style.float="right";
        div.style.textAlign="right";
        document.getElementById("status").textContent="Idle";
      }
      else{
        document.getElementById("status").textContent="Idle";
      }
    });
    //Send to Server
    var textarea=document.getElementById("msg");
    textarea.addEventListener("keyup",function(e){
      if(e.which!=13)
       return;
     data=e.target.value;
     socket.emit("toserver",{data:data});
     e.target.value='';
   });
    textarea.addEventListener("keydown",function(){
      socket.emit("status",{data:"Someone is typing",host:window.location.host.split(":")[0]});
    });

  }
}());