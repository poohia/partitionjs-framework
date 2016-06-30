//--------------------------- DEPENDENCYS -------------------------------------------------------/
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
//----------------------------------------------------------------------------------------------/


module.exports = function(app){
	'use strict';
	
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
		f404 : f404,
	}
}