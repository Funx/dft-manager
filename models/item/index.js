// models/item.js
var mongoose = require('mongoose')
  // load plugins
  , createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin
  // load helpers
  , makeStatic = require('helpers/makeStatic')
  // load schema
  , itemSchema = require('models/item/item.schema')

itemSchema
  // plugins
  .plugin(createdModifiedPlugin, { index: true })

  // params
  .set('toJSON', { virtuals: true })
  .set('toObject', { virtuals: true })

  // hooks
  .pre('remove', require('models/item/item.pre.remove'))

// static methods
itemSchema.statics = {
    exists: require('models/item/item.statics.exists')
  , register: require('models/item/item.statics.register')
  , searchByName: require('models/item/item.statics.searchByName')
  , updateCosts: makeStatic(require('models/item/item.methods.updateCosts'))
}

// methods
itemSchema.methods = {
    calcCost: require('models/item/item.methods.calcCost')
  , updateCosts: require('models/item/item.methods.updateCosts')
}

module.exports = mongoose.model('Item', itemSchema)
