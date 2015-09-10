// models/item.js
var mongoose = require('mongoose')
  // load plugins
  , createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin
  // load helpers
  , makeStatic = require('helpers/makeStatic')
  // load schema
  , itemSchema = require('models/deck/deck.schema')

itemSchema
  // plugins
  .plugin(createdModifiedPlugin, { index: true })

  // params
  .set('toJSON', { virtuals: true })
  .set('toObject', { virtuals: true })

  // hooks

// static methods
itemSchema.statics = {

}

// methods
itemSchema.methods = {

}

module.exports = mongoose.model('Deck', deckSchema)
