#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var requireDir = require('require-dir');
var fs      = require('fs');
var ejsLocals = require('ejs-locals');
var pages = requireDir('./controllers/pages');
var db = require('./database');
var app = express();
var bodyParser = require("body-parser");
var models = requireDir('./models');

/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating sample app ...',
                Date(Date.now()), sig);
            process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
                process.on(element, function() { self.terminator(element); });
            });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.app = express();

        self.app.use(bodyParser.urlencoded({ extended: false }));
        self.app.use(bodyParser.json());

        self.app.engine('ejs', ejsLocals);
        self.app.set('views', __dirname + '/views');
        self.app.set('view engine', 'ejs');

        //app.use(express.compress());
        self.app.use('/public', express.static(__dirname + '/../public'));

        self.app.get('/', function (req, res) {
            res.redirect('home');
        });

        self.app.delete('/admin/categories', function(req, res) {
            models.category.remove({_id: req.body.id}, function(err, data) {
                if (!err) {
                    res.send(data);
                }
            });
        });

        self.app.put('/admin/article', function(req, res) {
            if (req.body.id === 'new' || !req.body.id) {
                var article = new models.article(req.body);

                article.save(function(err, newArticle) {
                    if (!err) {
                        res.send(newArticle);
                    }
                });
            } else {
                models.article.update({_id: req.body.id}, req.body, function(err, newArticle) {
                    if (!err) {
                        res.send(newArticle);
                    }
                });
            }
        });

        self.app.put('/admin/categories', function(req, res) {
            if (req.body.id) {
                models.category.update({_id: req.body.id}, req.body, function(err, newCategory) {
                    if (!err) {
                        res.send(newCategory);
                    }
                });
            } else {
                var category = new models.category(req.body);

                category.save(function(err, newCategory) {
                    if (!err) {
                        res.send(newCategory);
                    }
                });
            }
        });

        for (var page in pages) {
            self.app.get('/' + pages[page].url, pages[page].controller);
        }
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        app.engine('ejs', ejsLocals);
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');

        self.setupVariables();
        self.setupTerminationHandlers();

        db.connect().catch(function(error) {
            self.terminator(error);

        });

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();