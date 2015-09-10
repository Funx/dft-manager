var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.Schema.Types.ObjectId

module.exports = new Schema({
  name: String
  ,cards: [{ type: ObjectId, ref: 'Item' }]
})
