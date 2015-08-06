var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.Schema.Types.ObjectId

module.exports = new Schema({
    name: String
  , content: [{type: ObjectId, ref: 'Item' }]
})
