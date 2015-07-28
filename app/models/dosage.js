
// load mongoose since we need it to define a model
var mongoose = require('mongoose')

var dosageSchema = mongoose.schema({
  _ingredient: { type: Schema.Types.ObjectId, ref: 'Item' },
  amount: Number
})

module.exports = mongoose.model('Dosage', itemSchema)
