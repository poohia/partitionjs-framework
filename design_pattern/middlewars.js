// append to modules/server.js '.use(yourmodule.start)'
module.exports = {
    start: function(req, res, next) {
        your_module.principalFunction(req, res, next);
    },
    your_module: function() {
        return your_module;
    }
};

//--------------------------- DEPENDENCYS -------------------------------------------------------/
//---------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES --------------------------------------------------------/
//--------------------------------------------------------------------------------------------/


var your_module = function() {
    'use strict';

    function principalFunction(req, res, next)
    {
        next();
    }
    return {
        principalFunction : principalFunction,
    }
}();