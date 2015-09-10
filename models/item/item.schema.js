var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.Schema.Types.ObjectId
  , dosageSchema = require('models/item/dosage.schema')

module.exports = new Schema({
    name: String
  , type: String
  , category: String
  , recipe: [dosageSchema]
  , _parents: [{ type: ObjectId, ref: 'Item' }]
  , _deck: { type: ObjectId, ref: 'Deck' }
  , price: Number
  , cost: Number
})
