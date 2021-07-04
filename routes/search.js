"use strict";
const express = require("express");
var app = express();
let router = express.Router();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// console.log("heyy");
var namesp = io.of('/search');
namesp.on('connection',function(socket){
    console.log("koii");
    socket.on('change',function(data){
        document.body.getElementsByClassName("player_1").innerHTML = "5";
    });
    socket.on("newThrow",function(data){
        console.log(data);
    })  
});

// router.use(function(req,res,next){
//     console.log(req.url,"@",Date.now())
// });
// router
// .route('/game')
// .get((req,res)=>{
//     res.sendFile(__dirname+'game.html');
// });

module.exports = router;