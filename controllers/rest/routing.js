/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var express = require('express');
var router = express.Router();
//----------------------------------------------------------------------------------------------/

//--------------- CONTROLLERS -------------------------------/

var apiController = require("./api.controller")();

//-----------------------------------------------------------/

// PARENT ROUTE  : '/api'

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

//------ Routing --------------------------/
    router.post('/connection', apiController.connection);
    router.put('/user/change-sexe', apiController.changeSexe);
    router.post('/user/logout',apiController.logOut);

//----------------------------------------/

//----- ERROR PAGE HTTP -----------------/

// 404 Not Found

router.all(/.*/, apiController.f404);



module.exports = router;

