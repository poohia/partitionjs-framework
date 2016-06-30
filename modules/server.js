/**
 * \file Server.js
 * \brief 
 * \date 25/06/2016
 * \author AZOULAY Jordan 
 */

//--------------------------- SERVER  ---------------------------------------------------------/
var express = require('express'),
    app = express(),
    favicon = require('express-favicon'),
    logger = require('express-log'),
    error = require('express-error-handler');
var http = require('http');
var minifyHTML = require('express-minify-html');

//---------------------------------------------------------------------------------------------/

//--------------------------- DEPENDENCYS -------------------------------------------------------/

var path = require('path');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');
var helmet = require('helmet');


var passport = require('passport');
require('./passport')(passport);


//---------------------------------------------------------------------------------------------/

//----------------------- MIDDLEWARS ----------------------------------------------------------/
var cookie = require("./../middlewars/cookie");
var firewall = require("./../middlewars/firewall");
var validate = require("./../middlewars/validate");
//---------------------------------------------------------------------------------------------/

//---------------------- ROUTINGS -------------------------------------------------------------/

var routing = require("./routing");
var apiRouting = require("./../controllers/rest/routing");
var ajaxRouting = require("./../controllers/ajax/routing");
//---------------------------------------------------------------------------------------------/

module.exports = function(partitionjs) {
    'use strict';

    var _port = 8080;
    var _server = null;

    function create() {
        _server = http.createServer(app);
        config();
        listen();
    }

    function listen() {

        if (app.get('env') === 'development') {
            console.log("Development mode");
            _port = 8081;
        }
        _server.listen(_port, function() {
            console.log("server start with number port " + _port);
        });
    }

    function config() {
        // Set environment 
        app.set('env', partitionjs.mode);
        // Set the views pathname to the views folder
        app.set('views', path.join(__dirname, '../views'));
        // Set the view engine to use Twig
        app.set('view engine', 'twig');
        app.set("twig options", {
            strict_variables: false
        });
        app.set('view options', {
            pretty: false
        });

        if (app.get('env') === 'production') {
            app.use(minifyHTML({
                override: true,
                htmlMinifier: {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeEmptyAttributes: true,
                    minifyJS: false
                }
            }));
        }
        if (app.get('env') === 'development') {
            app.use(logger('dev'));
            app.use(error());
        }

        app.use(favicon(__dirname + "/../views/images/favicon.ico"))


        // middleware that parse cookie header and populate req.cookies
        .use(cookieParser())
            // middleware session 
            .use(session({
                secret: 'partitionjs_framework_S3CRE7',
                cookie: {
                    maxAge: 3600000,
                    httpOnly: true
                },
                resave: false,
                saveUninitialized: true
            }))


        // compression middleware that enable deflate and gzip
        .use(compression())
            // Set the directory that will serve the front end files to public
            .use(serveStatic(path.join(__dirname, '../views')))
            // middleware used for going over POST request data, parse it into json on put it on req.body
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: false
            }))
            // Security of header Http
            .use(helmet())
            // Override for html form https://github.com/expressjs/method-override
            .use(methodOverride())
            // user passport
            .use(passport.initialize())
            .use(passport.session())
            // flash message
            .use(flash())
            // cookie
            .use(cookie.start)
            // firewall 
            .use(firewall.start)
            // validate middlewar
            .use(validate.start)

        //------------------ routings ----------------/
        //  .use('/yourrouting', routingfile)
        .use('/xhr', ajaxRouting)
            .use('/api', apiRouting)
            .use('/', routing);
        //-------------------------------------------/

    };

    function getServer() {
        return _server;
    }

    return {
        create: create,
        getServer: getServer
    }
}