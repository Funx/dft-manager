// load mongoose since we need it to define a model
var mongoose = require('mongoose')
  // load plugins
  , createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin
  // load helpers

  // load schema
  , itemsSchema = require('models/items/items.schema')


// plugins
itemsSchema
  .plugin(createdModifiedPlugin, { index: true })

// params
  .set('toObject', { virtuals: true })
  .set('toJSON', { virtuals: true })

// hooks

// static methods

// methods


module.exports = mongoose.model('Items', itemsSchema)
