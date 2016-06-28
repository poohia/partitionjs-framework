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
		res.render('index',{'flashMessage' : req.flash("message")},function(err, html){
			 minifyHtml(err, html, res);
			});
	}
	
	function dashboard(req, res)
	{
		res.render('dashboard',{'user' : req.user},function(err, html){
			minifyHtml(err, html, res);
		})
	}
	
	function f404(req, res)
	{
        res.status(404).render('404.twig', {'url' : req.url},function(err, html){
        	minifyHtml(err, html, res);
        });
	}
	

	
	function minifyHtml(err, html, res)
	{
		html = html.replace(/\n/g, '').replace(/>\s*</g, '><');
		res.send(html);
	}
	
	
	return {
		index : index,
		f404 : f404,
		dashboard : dashboard
	}
}