/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/


var validator = function(){

	//Minimum 6 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number:
	var _password  = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$");
	var _email = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
	var _empty = new RegExp(".*\\S.*");
	var _number = new RegExp("^\\d+$");
	var _sexe_man = "man";
	var _sexe_woman = "woman";
	var _zip_file = new RegExp('.*\.zip$');
	var _readme_file = new RegExp(/^.*\b(readme|README)\b.*$/);
	
	function password(password)
	{
		return _password.test(password) ; 	
	}

	function email(email)
	{
		return _email.test(email) ; 
	}
	function no_Empty(message)
	{
		return _empty.test(message) ;
	}
	function only_Number(message)
	{
		return _number.test(message) ;
	}
	function sexe(sexe)
	{
		return (sexe === _sexe_man) || (sexe === _sexe_woman) ;
	}
	function zip(zipFile)
	{
		return _zip_file.test(zipFile);
	}
	function readme(readmeFile)
	{
		return _readme_file.test(readmeFile);
	}
	return {
		password: password,
		email: email,
		no_Empty : no_Empty,
		only_Number : only_Number,
		sexe : sexe,
		zip : zip,
		readme : readme
	}
}();


// Compatible with expressjs
try{
	module.exports  = validator;}
catch(e){

}