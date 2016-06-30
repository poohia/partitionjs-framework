var chat = function()
{
    'use strict';
    
    var socket = null;
    
    var _selectors = {
        send_btn : '#send-message',
        $message : $('#message-text'),
        $chat    : $('#chat')
    }
    
    
    var divUserConnect = "<div class='infos-chat'>User __username__ connected ! </div>";
    var divUserDisconnect = "<div class='infos-chat'>User __username__ disconnected ! </div>";
    var divMessage = "<div class='message-content'> __username__ :  __message__ </div>";
    var divMyMessage = "<div class='message-content'> You : __message__ </div>";
    
    function sendMessage(e)
    {
        var data = new Object();
        var message = _selectors.$message.val();
        if(message.length !== 0)
        {
            data.message = message ;
            data.user = _user ;
            socket.emit('send message chat',data);
            _selectors.$message.val('');
            _selectors.$chat.append(divMyMessage.replace('__message__', message));
        }
        e.preventDefault();
    }
    
    function newUserController(data)
    {
        _selectors.$chat.append(divUserConnect.replace('__username__', data.user.name));
    }
    
    function disconnectUserController(data)
    {
        _selectors.$chat.append(divUserDisconnect.replace('__username__', data.user.name));
    }
    
    function getMessageController(data)
    {
        _selectors.$chat.append(divMessage.replace('__username__', data.user.name).replace('__message__', data.message));
       
    }
    
    function listen()
    {
        socket.on('new user', newUserController);
        socket.on('user disconnect', disconnectUserController);
        socket.on('get message chat', getMessageController);
    }
    
    function init()
    {
        socket = io.connect(window.location.origin + '/chat');
        $(_selectors.send_btn).on("click",sendMessage);
        listen();
        var data = new Object();
        data.user = _user;
        socket.emit("joint room", data);
    }
    
    return{
        init: init
    }
}();

$(document).ready(function(){
   chat.init(); 
});