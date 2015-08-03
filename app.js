require('app-module-path').addPath(__dirname)
global.__base = __dirname + '/'


// server.js

// set up ========================
var express = require('express')
  , mongoose = require('mongoose') // mongoose for mongodb
  , morgan = require('morgan') // log requests to the console (express4)
  , bodyParser = require('body-parser') // pull information from HTML POST (express4)
  , methodOverride = require('method-override') // simulate DELETE and PUT (express4)

// load the config
var app = express() // create our app w/ express
  , port = process.env.PORT || 8888 // set the port

var database = require('config/database')

mongoose.connect(database.url, function(err) {
  if (err) throw err
}) // connect to mongoDB database

// log every request to the console
app.use(morgan('dev'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended': 'true'}))
// parse application/json
app.use(bodyParser.json())
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}))
app.use(methodOverride())


// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'))

// load the routes
app.use(require('controllers'))



// listen (start app with node server.js) ======================================
app.listen(port, function () {
  console.log("App listening on port " + port)
})
