/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//-------------------------- DEPENDENCYS ------------------------------/
var program = require('commander');
var dirModules = __dirname + "/modules/";
var cmdValue = null;
//---------------------------------------------------------------------/

program
    .action(function(cmd, env) {
        cmdValue = cmd;
    });
program.parse(process.argv);
    

var partitionjs = {} ;
// Get mode ( node app mod=dev)
if(cmdValue && cmdValue.split("=")[1] === "development")
    partitionjs.mode = "development";
else
    partitionjs.mode = "production";
    


// SERVER
partitionjs.server = require(dirModules + 'server')(partitionjs);
partitionjs.server.create();


// DATABASE
partitionjs.db = require(dirModules + 'mongoose')(partitionjs);
partitionjs.db.connect();

// SOCKET
partitionjs.socket = require(dirModules + 'socket')(partitionjs);
partitionjs.socket.create();

module.exports = partitionjs;