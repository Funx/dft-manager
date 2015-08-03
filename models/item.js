// models/item.js
var mongoose = require('mongoose')
  , createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin
  , async = require("async")


var Schema = mongoose.Schema
  , ObjectId = mongoose.Schema.Types.ObjectId

var dosageSchema = new Schema({
      _ingredient: { type: ObjectId, ref: 'Item' }
    , quantity: Number
  })

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

  .pre('save', function (next) {
    var newDependencies = []

    async.map(this.recipe, registerRecipe, (error, result) => {
      if (error) throw error
      this.recipe = result
      console.log(this)
      return next(this)
    })
  })

function registerRecipe (dosage, next) {
  if(dosage._ingredient._id) {
    registerExistingIngredient(dosage, next)
  } else {
    createAndRegisterIngredient(dosage, next)
  }
}

function registerExistingIngredient (dosage, next) {
  dosage._ingredient = dosage._ingredient._id
  return next(null, dosage)
}

function createAndRegisterIngredient (dosage, next) {
  Item
    .find({'name': dosage._ingredient.name})
    .exec((err, item) => {
      // if already exists
      if (item.length) {
        dosage._ingredient = item[0]._id
        return next(null, dosage)
      } else {
        // else create it
        var ingredient = new Item(dosage._ingredient)
          .save((err,newItem) => {
            if (err) throw (err)
            dosage._ingredient = newItem._id
            newDependencies.push(newItem)
            return next(null, dosage)
          })
      }
    })
}

module.exports = mongoose.model('Item', itemSchema)
