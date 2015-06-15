
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
  price: Number
},{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

itemSchema.plugin(createdModifiedPlugin, {index: true});

itemSchema.virtual('categorySlug').get(function () {
  var categorySlug = this.category || '';
  return categorySlug.toSlug();
});

// itemSchema.virtual('cost').get(function() {
//   $this = this;
//   if(this.recipe.length) {
//     return this.recipe.reduce(function(prev, next){
//       next._ingredient = next._ingredient || {cost:0};
//       return prev + next._ingredient.cost * next.quantity;
//     }, 0);
//   } else {
//     return this.price || 0;
//   }
//
// });

itemSchema.set('toJSON', { virtuals: true });
itemSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Item', itemSchema);
