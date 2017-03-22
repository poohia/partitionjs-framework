/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var mongoose = require('mongoose');
//---------------------------------------------------------------------------------------------/
module.exports = function(partitionjs) {
    'use strict';


   var url = 'mongodb://192.168.99.100:27017/';
   var defaultDatabase = 'partitionjs';
    
    // Connect to the MongoDB database then load the users and chatRooms collections
   function connect(db) {
       
       if(typeof db === 'undefined')
            db = defaultDatabase;
       mongoose.Promise = global.Promise;     
       var connection =  mongoose.connect(url + db);
       var listenner = mongoose.connection;
	   listenner.on('error', console.error.bind(console, 'connection error:'));
	   return connection ;
	   
    }

    return {
        connect: connect
    }
}