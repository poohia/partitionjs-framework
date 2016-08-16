/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var mongoose = require('mongoose');
var validator  = require("./../views/common_modules/validate.module");

//----------------------------------------------------------------------------------------------/

var userSchema = mongoose.Schema({
    local            : {
        email        : String,
        password     : String,
        name 		 : {type :String,  unique : true},
        role         : String,
        avatar       : String,
        sexe         : {
            type: String,
            required: 'Bad value',
            validate: function(value){
                if(validator.sexe(value))
                    return true;
                else
                  return false;
            }
        },
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    
});
module.exports = mongoose.model('User', userSchema);

userSchema.pre("save",function(next)
{
   switch (this.local.sexe) {
       case 'man':
           this.local.avatar = "/images/man.jpg" ;
           break;
       case 'woman':
           this.local.avatar = "/images/woman.jpg" ;
           break;
       default:
           break;
   }
   next();
});