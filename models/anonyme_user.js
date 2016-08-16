/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/


	

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var hash = require("./../modules/hash")();
//----------------------------------------------------------------------------------------------/



module.exports = function(app){
	'use strict';

	var anonyme = 
	{ 
       "local" :
		{
			'email' : "anonyme", 
			'password' : "",
			'role'    : hash.generateHash('ANONYMOUS')
		},
		
	}
	function getAnonymeUser(){
		return anonyme;
	}

	return {
		getAnonymeUser : getAnonymeUser
	}
}