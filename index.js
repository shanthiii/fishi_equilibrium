var app = require('express')();
var http = require('http').Server(app);
var search = require('./routes/search');
var io = require('socket.io')(http);
app.use('/search',search);
app.get('/', function(req, res) {
   res.sendFile(__dirname+ '/index.html');
});
app
.route('/search')
.get((req,res)=>{
   res.sendFile(__dirname+'/search.html');
})

var x=0;
var y;
var dp=['a','b','c','d'];
io.on('connection', function(socket) {
    socket.on('clientEvent', function(data) {
        dp[x] = (data.description);
        x++;
        y = dp[x];
       console.log(x);
    });
 });

var name_space = io.of('/search');
var clients = 0;
name_space.on('connection',function(socket){
   clients++;
   name_space.on('placeName',function(data){
        console.log(data.description);
   });
   socket.on('clientEvent', function(data) {
        console.log(data.description);
    });
    socket.on('broadcast', function(data) {
        console.log(data.description);
    });
   if(clients < 4){
      x = 4-clients;
      name_space.emit('broadcast',{ description: "waiting for " + x + ' more clients to connect to play the game!'});
      socket.on('disconnect',function(){
         clients--;
         name_space.emit('broadcast',{ description: "waiting for " + 4-clients + ' more clients to connect to play the game!'});
         
      });
      
   }
   else{
         console.log('someone connected');

         name_space.emit('hi', dp,-25,-25,-25,-25);
         name_space.emit('change','changing');
      }



    socket.on("newThrow",function(data){
        console.log(data);
    })  
   
});

http.listen(7777, function() {
   console.log('listening on *:7777');
});
