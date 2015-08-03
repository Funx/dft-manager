// models/item.js
var mongoose = require('mongoose')
  , createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin

var Schema = mongoose.Schema
  , ObjectId = mongoose.Schema.Types.ObjectId

var dosageSchema = new Schema({
      _ingredient: { type: ObjectId, ref: 'Item' }
    , quantity: Number
  })
console.log(dosageSchema)

var itemSchema = new Schema({
      name: String
    , type: String
    , category: String
    , recipe: [dosageSchema]
    , price: Number
  })
  .plugin(createdModifiedPlugin, { index: true })
  .set('toJSON', { virtuals: true })
  .set('toObject', { virtuals: true })

module.exports = mongoose.model('Item', itemSchema)
