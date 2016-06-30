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
    
//-------- Functions -----------------------/


//------------------------------------------/

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
        f404 : f404,
    }

}
