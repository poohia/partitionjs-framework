/**
* \file Server.js
* \brief INSTALL BUNDLE
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

var program = require('commander');
var fs = require('fs-extra');
var unzip = require('unzip');
var async = require('async');
var validate = require('./views/common_modules/validate.module');
var chalk = require('chalk');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


var cmdValue = null;
var nameOfPlugin = null;
var pathBundles = './bundles';

'use strict';

program
    .version('0.9.0-beta')
    .description('Install Bundle zip')
    .usage('<zip file>')
    .arguments('<zip file>')
    .action(function(cmd, env) {
        cmdValue = cmd;
    });

program.parse(process.argv);
nameOfPlugin = cmdValue.replace('.zip', '');
console.log(chalk.white("======== Start to read plugin ============"));

if (validate.zip(cmdValue)) {
    try {

        var errors = new String();
        var unzipParser = unzip.Parse();
        var readStream = fs.createReadStream(cmdValue).pipe(unzipParser);

        readStream.on('entry', function(entry) {

            var path = entry.path.replace(nameOfPlugin + '/', '');
            var type = entry.type;
            if (type === 'File') {
                if (fileExists(path)) {
                    console.log(path + 'file exist');
                    errors += '\t\n ' + path + ' file exist ';
                }
                else {
                    console.log(path);
                }
            }
            entry.autodrain();
        });
        unzipParser.on('error', function(err) {
            throw err;
        })
        unzipParser.on('close', function() {
            console.log(chalk.white("\n======== "+ nameOfPlugin  + " bundle ============"));
            if (errors == '') {
                console.log('No errors');
                installBundle(true);
            }
            else {
                console.log(chalk.red.bold.underline(errors));
                installBundle(true);
            }
        });

    }
    catch (e) {
        finishWithError(e);
    }
}
else {
    finishWithError('Need zip file.');
}


function installBundle(ask) {
    if (ask) {
        rl.question('Do you want start install this bundle ?[Y,n]', function(answer) {
            if (answer.length == 0 || answer == 'y' || answer == 'Y' || answer == 'yes') {
                installBundle(false);
            }
            else if (answer == 'n' || answer == 'N' || answer == 'no') {
                finish();
            }
            else {
                installBundle(true);
            }
        });
    }
    else {
        fs.createReadStream(cmdValue).pipe(unzip.Extract({
                path: pathBundles
            }))
            .on('close', () => {
                console.log('Unzip success');
                var files = getFiles(pathBundles);
                async.map(files, function(file, callback) {
                    var src = pathBundles + '/' + nameOfPlugin + '/' + file;
                    var dest = './' + file;

                    if (validate.readme(file)) {
                        console.log('Readme file : ' + src);
                        callback();
                    }
                    else if (fileExists(dest)) {
                        fs.move(dest, dest + '.old', function(err) {
                            if (err) {
                                console.error(err);
                                callback();
                            }
                            else {
                                console.log('save file : ' +  dest + ' to ' + dest + '.old');
                                fs.move(src, dest, function(err) {
                                    if (err) console.error(err);
                                    callback();
                                });
                            }
                        });
                    }
                    else {
                        fs.move(src, dest, function(err) {
                            if (err) console.error(err);
                            callback();
                        });
                    }
                }, function(err, results) {
                    finish();
                });

            })
            .on('error', function(err) {
                finishWithError(err);
            });
    }
}


function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        }
        else {
            files_.push(name.replace(pathBundles + '/' + nameOfPlugin + '/', ''));
        }
    }
    return files_;
}


function fileExists(path) {

    try {
        return fs.statSync(path).isFile();
    }
    catch (e) {

        if (e.code == 'ENOENT') {
            return false;
        }
    }
}

function finish() {
    process.exit(0);
}

function finishWithError(message) {
    if (message !== undefined)
        console.log(chalk.red.bold.underline("Error : ", message));
    process.exit(1);
}
