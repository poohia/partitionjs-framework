/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan / Scotch.io(https://scotch.io/tutorials/easy-node-authentication-setup-and-local)
*/

LocalStrategy = require('passport-local').Strategy;


//--------------------------- DEPENDENCYS -------------------------------------------------------/
var hash = require("./hash")();
var firewall = require("./../middlewars/firewall.js").firewall();
//---------------------------------------------------------------------------------------------/


//--------------------------- ENTITIES -------------------------------------------------------/
// load up the user model
var User            = require('./../models/user');

//-------------------------------------------------------------------------------------------/


// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {



        
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {


        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('message', 'That email is already taken.'));
            } else {
                // if there is no user with that email
                // create the user
                var newUser            = new User();
                
                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = hash.hashUserPassword(password);
                newUser.local.name     = req.body.name;
                newUser.local.sexe     = req.body.sexe;
                newUser.local.role     = firewall.getStringRole("USER");
                
                // save the user
                newUser.save(function(err) {
                    if (err)
                        {
                            switch(err.code)
                            {
                                case 11000 :
                                    return done(null, false, req.flash('message', 'Error 13011 #A duplicate .'));
                                    break;
                                default :
                                    return done(null, false, req.flash('message', 'Error 13010 #Somethink broken'));
                            }
                        }
                    return done(null, newUser);
                });
            }

        });    

        });

    }));


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        /**, 'local.password' : hash.hashUserPassword(password)**/
        
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);
            
            // test password
           if(user === null || !hash.validUserPassword(password, user.local.password) )
            {  
                return done(null, false, req.flash('message', 'You entered an email address/password combination that doesn\'t match.'));
            }

            // all is well, return successful user
            return done(null, user);
        });

    }));

};