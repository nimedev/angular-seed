/** Main application file */
'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// BASE SETUP
// ======================================

/** PACKAGES */
/**
 * core modules
 * @requires path
 */
var path = require('path');

/**
 * npm modules
 * @requires express.
 */
var express = require('express'); // call express

/** others modules */
var config = require('./config');

// variables
var app = express(); // define our app using express;

// APP CONFIGURATION ==================
// ====================================

// set static files location
// used for requests that our frontend will make
app.use('/', express.static(__dirname + '/public'));

// ROUTES FOR OUR API =================
// ====================================

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// START THE SERVER
// ====================================
app.listen(config.port, config.ip, function () {
  console.log('Magic happens on port %d, in %s mode', config.port, app.get('env'));
});
