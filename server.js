// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express = require('express'), // call express
  path = require('path'),
  config = require('./config'),
  app = express(); // define our app using express

// APP CONFIGURATION ==================
// ====================================

// set static files location
// used for requests that our frontend will make
app.use('/', express.static(__dirname + '/public'));

// ROUTES FOR OUR API =================
// ====================================

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// START THE SERVER
// ====================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
