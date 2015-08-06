var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , SchemaObjectId = mongoose.Schema.Types.ObjectId

module.exports = new Schema({
    _ingredient: { type: SchemaObjectId, ref: 'Item' }
  , quantity: Number
})
