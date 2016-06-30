/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var bcrypt   = require('bcrypt-nodejs');
var crypto = require("crypto");
//----------------------------------------------------------------------------------------------/

module.exports = function(app){
	'use strict';

	function generateHash (message){
			return crypto.createHash('md5').update(message).digest("hex");
	};

	// methods ======================
	// generating a hash
	function  hashUserPassword(password) {
	    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	// checking if password is valid
	 function validUserPassword(password, password_bdd) {
	    return bcrypt.compareSync(password, password_bdd);
	};

	return {
		generateHash : generateHash,
		hashUserPassword: hashUserPassword,
		validUserPassword : validUserPassword
	}
}