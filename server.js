// server.js
export function run(appdir){
  extendNativeObjects()

  // set up ========================
  var express = require('express')
  var app = express() // create our app w/ express
  app.dir = appdir
  var mongoose = require('mongoose') // mongoose for mongodb
  var port     = process.env.PORT || 8888                // set the port
  var morgan = require('morgan') // log requests to the console (express4)
  var bodyParser = require('body-parser') // pull information from HTML POST (express4)
  var methodOverride = require('method-override') // simulate DELETE and PUT (express4)

  // load the config
  var database = require(app.dir + '/config/database')
  mongoose.connect(database.url, function(err) {
      if (err) throw err
  }) // connect to mongoDB database


  app.use(express.static(app.dir + '/build')) // set the static files location /public/img will be /img for users

  app.use(morgan('dev')) // log every request to the console

  app.use(bodyParser.urlencoded({ // parse application/x-www-form-urlencoded
    'extended': 'true'
  }))
  app.use(bodyParser.json()) // parse application/json
  app.use(bodyParser.json({ // parse application/vnd.api+json as json
    type: 'application/vnd.api+json'
  }))

  app.use(methodOverride())

  // load the routes
  require(app.dir + '/app/routes')(app)

  // listen (start app with node server.js) ======================================
  app.listen(port)
  console.log("App listening on port "+port)

}

function extendNativeObjects() {
  String.prototype.trim = function(){
  	return this.replace(/^\s+|\s+$/g, "")
  }

  String.prototype.toCamel = function(){
  	return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','')})
  }

  String.prototype.toDash = function(){
  	return this.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase()})
  }

  String.prototype.toUnderscore = function(){
  	return this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase()})
  }

  String.prototype.removeAccents = function(){
    var translate_re = /[öäüÖÄÜéÉêÊëËèÈçÇàÀ]/g
    var translate = {
      "ä": "a", "ö": "o", "ü": "u" , "é": "e" , "ê": "e" , "è": "e" , "ç": "c" , "à": "a", "ë": "e",
      "Ä": "A", "Ö": "O", "Ü": "U" , "É": "E" , "Ê": "e" , "È": "e" , "Ç": "c" , "A": "a", "Ë": "E",
    }
    return ( this.replace(translate_re, function(match) {
      return translate[match]
    }) )
  }

  String.prototype.toSlug = function(){
    var str = this.replace(/^\s+|\s+$/g, '').toLowerCase()

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:"
    var to   = "aaaaeeeeiiiioooouuuunc------"
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-') // collapse dashes

    return str
  }
}
