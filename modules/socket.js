/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS -------------------------------------------------------/

var chatController = require("./../controllers/socketio/chat.controller")();
	
//---------------------------------------------------------------------------------------------/

module.exports = function (partitionjs) {
	'use strict';
	
   var io  = null ;
	
	
   	function create()
   	{
   	    io = require('socket.io').listen(partitionjs.server.getServer());
        listen();
   	}

    function listen()
    {
        //---------------------- Routes ------------------------------------/
            //io.of('/yourRoute').on('connection',function(socket){});
        
            io.of("/chat").on("connection", function(socket){
                 socket.on('joint room', function(data) {
                     chatController.jointRoom(socket, data);
                 });
                 socket.on('disconnect', function(){
                     chatController.disconnect(socket);
                 });
                 socket.on("send message chat", function(data){
                     chatController.sendMessageChat(socket, data);
                 });
            });
    }
	return{
        create : create,
        listen : listen,
	}
}