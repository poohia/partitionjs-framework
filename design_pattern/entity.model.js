//--------------------------- DEPENDENCYS -------------------------------------------------------/
var mongoose = require('mongoose');
var validator  = require("./../views/common_modules/validate.module");

//----------------------------------------------------------------------------------------------/


//---- MODEL --------------------/

var nameSchema = mongoose.Schema({

});
module.exports = mongoose.model('User', nameSchema);


//---- FUNCTIONS ------/

//---------------------/