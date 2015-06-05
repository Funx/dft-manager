
// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var dosageSchema = new Schema()
dosageSchema.add({
  _ingredient: {type: ObjectId, ref: 'Item' },
  quantity: Number
});

var itemSchema = new Schema({
  name: String,
  type: String,
  category: String,
  recipe: [dosageSchema],
  cost: Number,
  price: Number
});

itemSchema.plugin(createdModifiedPlugin, {index: true});

itemSchema.virtual('categorySlug').get(function () {
  return this.category.toSlug();
});

module.exports = mongoose.model('Item', itemSchema);
