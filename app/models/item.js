
// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var dosageSchema = new Schema({
  _ingredient: {type: ObjectId, ref: 'Item' },
  quantity: Number
});

var itemSchema = new Schema({
  name: String,
  type: String,
  category: String,
  recipe: [dosageSchema],
  buyingPrice: Number,
  sellingPrice: Number
});

module.exports = mongoose.model('Item', itemSchema);
