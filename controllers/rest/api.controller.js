/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var response = require("./../../modules/response")();
var hash = require("./../../modules/hash")();
var validator = require("./../../views/common_modules/validate.module");
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
var User = require('./../../models/user');
var user_anonyme = require('./../../models/anonyme_user')();
//----------------------------------------------------------------------------------------------/

// For use this API, req.body need to Json  value (Content-Type : application/json)

module.exports = function(app) {

    function connection(req, res) {
        if (req.body.email === undefined || req.body.password === undefined) {
            response.responseBadRequest(res);
        }
        else {

            var email = req.body.email;
            var password = req.body.password;
            User.findOne({
                'local.email': email
            }, 'local.email local.password local.avatar local.sexe local.name local.token', function(err, user) {
                if (err) {
                    response.error(res, err);
                    return false;
                }
                if (user === null) {
                    response.responseBadRequest(res);
                    return false;
                }
                if (!hash.validUserPassword(password, user.local.password)) {
                    response.badRequest(res, "You entered an email address/password combination that doesn't match.");
                }
                else {
                    req.login(user, () => {});
                    var data = new Object();
                    data.user = user.local;
                    data.token = user._id;
                    response.responseJson(res, data);
                }
            });
        }
    }

    function changeSexe(req, res) {
        token(req, function(err, user) {
            if (err) {
                response.badRequest(res, err);
                return false;
            }
            if(validator.sexe(req.body.sexe))
            {
                user.local.sexe = req.body.sexe ;
                user.save(function(err, user) {
                    if (err) {
                        response.error(res, err);
                        return false;
                    }
                    if (user === null) {
                        response.responseBadRequest(res);
                        return false;
                    }
                    else
                        response.responseOK(res);
                });
            }
            else
            {
                response.responseBadRequest(res);
            }
        });
    }

    function logOut(req, res) {
        token(req, function(err, user) {
            if (err) {
                response.badRequest(res, err);
            }
            else
            {
                req.logout();
                response.responseOK(res);
            }
            
        });
    }



    // callback : function(err, user){} 
    function token(req, callback) {
        var token = req.headers.authorization;
        // test if token is empty, request user is empty and if request user is anonymous . For finish, token test if session user id is equal than header authorization
        if (token === undefined || req.user === undefined || req.user.local.role == user_anonyme.getAnonymeUser().local.role || req.user._id != token)
            callback("BAD REQUEST");
        else {
            
            User.findById(token, function(err, user) {
                if (err) {
                    callback(err);
                }
                if (user === null) {
                    callback("Bad token ID");
                }
                else {
                        callback(null, user);
                }
                

            });
        }
    }
    
    function f404(req, res)
    {
        response.responseNotFound(res);
    }

    return {
        connection: connection,
        changeSexe: changeSexe,
        logOut : logOut,
        f404 : f404
    }

}
