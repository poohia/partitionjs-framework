/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS ------------------------------------------------------/
var chalk = require('chalk');
const readline = require('readline');
var validate = require("./../views/common_modules/validate.module");
var hash = require("./../modules/hash")();
var firewall = require("./../middlewars/firewall").firewall();
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES --------------------------------------------------------/
var userModel = require('./../models/user');
//---------------------------------------------------------------------------------------------/


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = function() {

    var _user = new Object();
//----- DATABASE --------/
    var _db = null ;
    
   _db =  require('./../modules/mongoose')();
   _db.connect();
//-----------------------/


    var _question = {
        email: function(callback) {
            rl.question(chalk.bold("Email : "), function(answer) {
                if (!validate.email(answer)) {
                    console.log(chalk.red.bold.underline("Bad email"));
                    _question.email(callback);
                }
                else {
                    userExist(answer, function(isExist) {
                        if (isExist) {
                            console.log(chalk.red.bold.underline("Email exist"));
                            _question.email(callback);
                        }
                        else {
                            _user.email = answer;
                            callback();
                        }
                    })
                }
            })
        },
        password: function(callback) {
            rl.question(chalk.bold("Password : "), function(answer) {
                if (!validate.password(answer)) {
                    console.log(chalk.red.bold.underline("Bad password"));
                    _question.password(callback);
                }
                else {
                    _user.password = hash.hashUserPassword(answer);
                    callback();
                }
            })
        },
        pseudo: function(callback) {
            rl.question(chalk.bold("Pseudo : "), function(answer) {
                userModel.findOne({
                    'local.name': answer
                }, function(err, user) {
                    if (err)
                        finishWithError(err);
                    if (user) {
                        console.log(chalk.red.bold.underline("Pseudo exist"));
                        _question.pseudo(callback);
                    }
                    else {
                        _user.pseudo = answer;
                        callback();
                    }
                });
            })
        },
        sexe: function(callback) {
            rl.question(chalk.bold("Sexe (man, woman) :"), function(answer) {
                if (!validate.sexe(answer)) {
                    console.log(chalk.red.bold.underline("Bad sexe"));
                    _question.sexe(callback);
                }
                else {
                    _user.sexe = answer;
                    callback();
                }
            })
        },
        role: function(callback) {
            rl.question(chalk.bold("Role (USER, ADMIN) :"), function(answer) {
                if (!firewall.isExist(answer)) {
                    console.log(chalk.red.bold.underline("Role not exist"));
                    _question.role(callback);
                }
                else {
                    _user.role = hash.generateHash(answer);
                    callback();
                }
            });
        }
    }

    function create() {
        process.stdin.setEncoding('utf8');
        console.log(chalk.white("============ Start create user =============="));
        _question.email(function() {
            _question.password(function() {
                _question.pseudo(function() {
                    _question.sexe(function() {
                        _question.role(function() {
                            userModel.create({
                                "local.email": _user.email,
                                "local.name": _user.pseudo,
                                "local.password": _user.password,
                                "local.sexe": _user.sexe,
                                "local.avatar": _user.avatar,
                                "local.role": _user.role
                            }, function(err, user) {
                                if (err)
                                    FinishWithError(err);
                                console.log(chalk.bgGreen.bold("User :", user, " \ncreated!"));
                                finish();
                            })
                        });
                    })
                })
            })
        });

    };

    function scriptCreateUser() {

        userModel.create({
            'local.email': 'toto@gmail.com',
            'local.name': 'toto',
            'local.password': hash.hashUserPassword("Password1"),
            'local.sexe': 'man',
            'local.role': hash.generateHash("USER")
        }, function(err, user) {
            if (err)
                FinishWithError(err);
            console.log(chalk.bgGreen.bold("User :", user, " \ncreated!"));

        });
        userModel.create({
            'local.email': 'toto2@gmail.com',
            'local.name': 'toto2',
            'local.password': hash.hashUserPassword("Password1"),
            'local.sexe': 'man',
            'local.role': hash.generateHash("USER")
        }, function(err, user) {
            if (err)
                FinishWithError(err);
            console.log(chalk.bgGreen.bold("User :", user, " \ncreated!"));

        });
        userModel.create({
            'local.email': 'toto3@gmail.com',
            'local.name': 'toto3',
            'local.password': hash.hashUserPassword("Password1"),
            'local.sexe': 'man',
            'local.role': hash.generateHash("USER")
        }, function(err, user) {
            if (err)
                FinishWithError(err);
            console.log(chalk.bgGreen.bold("User :", user, " \ncreated!"));

        });
        userModel.create({
            'local.email': 'toto4@gmail.com',
            'local.name': 'toto4',
            'local.password': hash.hashUserPassword("Password1"),
            'local.sexe': 'woman',
            'local.role': hash.generateHash("USER")
        }, function(err, user) {
            if (err)
                FinishWithError(err);
            console.log(chalk.bgGreen.bold("User :", user, " \ncreated!"));

        });
        console.log("Password for all : 'Password1'");
    }

    function userExist(email, callback) {
        userModel.findOne({
            "local.email": email
        }, function(err, user) {
            if (err)
                FinishWithError(err);
            if (user)
                callback(true);
            else
                callback(false);
        })
    }

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
        var help = "\tuser:create     create new user";
        help += "\n\tuser:generate   generate random users";
        return help;
    }

    function getCommande() {
        return "user";
    }

    function start(commande) {
        var commandeSplit = commande.split(':');
        switch (commandeSplit[0]) {
            case 'create':
                create();
                break;
            case 'generate':
                scriptCreateUser();
                break;
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