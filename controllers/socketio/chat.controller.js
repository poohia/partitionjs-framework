/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCY -------------------------------------------------------/
var    ent = require('ent');
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
//----------------------------------------------------------------------------------------------/
    
module.exports = function(){
    'use strict';
    
    function jointRoom(socket, data)
    {
      socket.user = data ;
      socket.broadcast.emit('new user', data);
    };
    function disconnect(socket)
    {
        socket.broadcast.emit('user disconnect', socket.user) ;
    }
	
	function sendMessageChat(socket, data)
	{
        data.message = ent.encode(data.message) ;
	    socket.broadcast.emit('get message chat', data) ;
	}
	
	return {
        jointRoom : jointRoom,
        disconnect : disconnect,
        sendMessageChat : sendMessageChat,
	}
	
}