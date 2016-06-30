/**
 * \file Server.js
 * \brief 
 * \date 25/06/2016
 * \author AZOULAY Jordan 
 */


//--------------------------- DEPENDENCYS -------------------------------------------------------/
var response = require("./../../modules/response")();
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
var User = require('./../../models/user');
//----------------------------------------------------------------------------------------------/



module.exports = function(app) {

    function getPseudo(req, res) {
        User.findOne({
            'local.name': req.params.pseudo
        }, '_id', function(err, user) {
            if (err) {
                response.badRequest(res, err);
                return false;
            }
            var data = new Object();
            if (user) {
                data.pseudo = true;
                response.responseJson(res, data);
            }
            else {
                data.pseudo = false;
                response.responseJson(res, data);
            }
        })
    }

    function f404(req, res) {
        response.responseNotFound(res);
    }

    return {
        getPseudo: getPseudo,
        f404 : f404
    }

}
