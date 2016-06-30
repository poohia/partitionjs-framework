//--------------------------- DEPENDENCYS ------------------------------------------------------/
var chalk = require('chalk');
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES --------------------------------------------------------/
//---------------------------------------------------------------------------------------------/


module.exports = function() {

//----- DATABASE --------/
    var _db = null ;
    
   _db =  require('./../modules/mongoose')();
   _db.connect();
//-----------------------/

//--------- Functions --------------------------------------------------------/



//---------------------------------------------------------------------------/


//--------- PATERN CONSOLE TOOL --------------------------------------------/
    function finish() {
        process.exit(0);
    }

    function finishWithError(message) {
        if (message !== undefined)
            console.log(chalk.red.bold.underline("Error : ", message));
        process.exit(1);
    }

    function help() {
        var help = new String('');
        /*help = "\tuser:create     create new user";
        help += "\n\tuser:generate   generate random users";*/
        return help;
    }

    function getCommande() {
      //  return "user";
    }

    function start(commande) {
        var commandeSplit = commande.split(':');
        switch (commandeSplit[0]) {
            default:
                finish();
        }
    }

    return {
        help: help,
        getCommande: getCommande,
        start: start
    }
//----------------------------------------------------------------------/
}();