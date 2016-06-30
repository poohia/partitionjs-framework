//--------------------------- DEPENDENCYS -------------------------------------------------------/
var express = require('express');
var router = express.Router();
//----------------------------------------------------------------------------------------------/

//--------------- CONTROLLERS -------------------------------/


//-----------------------------------------------------------/

// PARENT ROUTE  : '/PARENTROUTE'

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

//------ Routing --------------------------/


//----------------------------------------/

//----- ERROR PAGE HTTP -----------------/

// 404 Not Found

//router.all(/.*/, CONTROLLER);



module.exports = router;

