// server.js
export function run(appdir){

  // set up ========================
  var express = require('express');
  var app = express(); // create our app w/ express
  app.dir = appdir
  var mongoose = require('mongoose'); // mongoose for mongodb
  var port     = process.env.PORT || 8080;                // set the port
  var morgan = require('morgan'); // log requests to the console (express4)
  var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
  var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

  // load the config
  var database = require(app.dir + '/config/database');
  mongoose.connect(database.url, function(err) {
      if (err) throw err;
  }); // connect to mongoDB database


  app.use(express.static(app.dir + '/build')); // set the static files location /public/img will be /img for users

  app.use(morgan('dev')); // log every request to the console

  app.use(bodyParser.urlencoded({ // parse application/x-www-form-urlencoded
    'extended': 'true'
  }));
  app.use(bodyParser.json()); // parse application/json
  app.use(bodyParser.json({ // parse application/vnd.api+json as json
    type: 'application/vnd.api+json'
  }));

  app.use(methodOverride());

  // load the routes
  require(app.dir + '/app/routes')(app);

  // listen (start app with node server.js) ======================================
  app.listen(port);
  console.log("App listening on port "+port);

}
