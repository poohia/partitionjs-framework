/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS -------------------------------------------------------/
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
//----------------------------------------------------------------------------------------------/


module.exports = function(app){
	'use strict';
	
	function index(req, res)
	{
		res.render('index',{'flashMessage' : req.flash("message")});
	}
	
	function dashboard(req, res)
	{
		res.render('dashboard',{'user' : req.user});
	}
	
	function f404(req, res)
	{
        res.status(404).render('404', {'url' : req.url});
	}
	

	
	
	return {
		index : index,
		f404 : f404,
		dashboard : dashboard
	}
}