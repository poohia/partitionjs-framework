/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

module.exports = {
    start: function(req, res, next) {

        module_cookie.getCookie(req, res, next);

    },
    cookie: function() {
        return module_cookie;
    }
};

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var passport = require('passport');
require('./../modules/passport')(passport);
//---------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES --------------------------------------------------------/
var User = require("./../models/user");
//--------------------------------------------------------------------------------------------/


var module_cookie = function() {
    'use strict';

    function getCookie(req, res, next) {
        if (req.cookies.user && !req.user) {
            var splitCookie = req.cookies.user.split(";");
            User.findOne({
                _id: splitCookie[0]
            }, function(err, user) {
                if (user && (user.local.password === splitCookie[1])) {
                    req.login(user, function(err) {
                        next();
                    });
                }
                else {
                    next();
                }
            });
        }
        else {
            next();
        }

    }

    return {
        getCookie: getCookie
    }
}();