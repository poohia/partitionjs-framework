/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS ----------------------/
var express = require('express');
var router = express.Router();
//------------------------------------------------------------/

//--------------- CONTROLLERS -------------------------------/

var ajaxController = require("./ajax.controller")();

//-----------------------------------------------------------/



// PARENT ROUTE  : '/xhr'

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

//------ Routing --------------------------/
    router.get('/pseudo/:pseudo', ajaxController.getPseudo);

//----------------------------------------/


//----- ERROR PAGE HTTP -----------------/

// 404 Not Found
router.all(/.*/, ajaxController.f404);

module.exports = router;

