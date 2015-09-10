// models/item.js
var mongoose = require('mongoose')
  // load plugins
  , createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin
  // load helpers
  , makeStatic = require('helpers/makeStatic')
  // load schema
  , deckSchema = require('models/deck/deck.schema')

deckSchema
  // plugins
  .plugin(createdModifiedPlugin, { index: true })

  // params
  .set('toJSON', { virtuals: true })
  .set('toObject', { virtuals: true })

  // hooks

// static methods
deckSchema.statics = {
  addItems: require('./deck.statics.addItems.js')
  ,removeItems: require('./deck.statics.removeItems.js')
}

// methods
deckSchema.methods = {

}

module.exports = mongoose.model('Deck', deckSchema)
