// load mongoose since we need it to define a model
var mongoose = require('mongoose')
  , createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin

var Schema = mongoose.Schema
  , ObjectId = mongoose.Schema.Types.ObjectId

var itemsSchema = new Schema({
      name: String
    , content: [{type: ObjectId, ref: 'Item' }]
  })
  .set('toObject', { virtuals: true })
  .set('toJSON', { virtuals: true })
  .plugin(createdModifiedPlugin, { index: true })

module.exports = mongoose.model('Items', itemsSchema)
