/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/
//--------------------------- DEPENDENCYS -------------------------------------------------------//

var program = require('commander');

var path = require('path'),
    walk = require('walk');

var dirModules = __dirname + "/console/";
var modules = new Array();

var cmdValue = null;

//-----------------------------------------------------------------------------------------------//

program
    .version('0.9.0-beta')
    .usage('<cmd>')
    .arguments('<cmd>')
    .action(function(cmd, env) {
        cmdValue = cmd;
    });

function loadModules(opts, done) {
    var walker = walk.walk(opts.folder, {
        followLinks: false
    });

    walker.on('file', function(root, stat, next) {
        var current = path.join(root, stat.name),
            extname = path.extname(current);

        if (extname === '.js' && (opts.filter === undefined || opts.filter(current))) {
            var module = require(current);
            modules.push(module);
        }

        next();
    });

    walker.on('end', function() {
        done();
    });
}

loadModules({
    folder: dirModules,
    filter: undefined
}, init);


function init() {
    program.on('--help', function() {
        console.log('  Commandes:');
        console.log('');
        for (var i = 0; i < modules.length; i++)
            console.log('    ' + modules[i].help());
        console.log('');
    });
    program.parse(process.argv);
    if (typeof cmdValue === 'undefined' || cmdValue === null) {
        console.error('no command given!');
        process.exit(1);
    }
    var cmdValueSplit = cmdValue.split(":");
    // find module about commande 
    for (var i = 0; i < modules.length; i++) {
        if (modules[i].getCommande() == cmdValueSplit[0]) {
            // if commande = user:generate:user:find . Send to module into start function generate:user:find ( remove 'user:' );
            modules[i].start(cmdValue.replace(cmdValueSplit[0]+':',''));
            return false;
        }
    }
}
