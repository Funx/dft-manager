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

itemSchema.statics = {
  // registerItem
  register: function registerItem (toRegister, done) {
    let Item = this.model('Item')
    let newDependencies = []

    function registerIngredient (dosage, next) {
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
      Item.find({
        'name': dosage._ingredient.name
      })
      .exec((err, item) => {
        // if already exists
        if (item.length) {
          dosage._ingredient = item[0]._id
          return next(null, dosage)
        } else {
          // else create it
          var ingredient = new Item(dosage._ingredient)
          ingredient.register((err, data) => {
            if (err) throw (err)

            dosage._ingredient = data.registered._id
            newDependencies.push(data.registered)
            newDependencies.concat(data.dependencies)
            return next(null, dosage)
          })
        }
      })
    }

    function saveRegisteredItem () {
      if (toRegister._id) {
        Item.update({_id: toRegister._id}, toRegister, {overwrite: true}, (err, item) => {
          if (err) throw err

          return done(null, {
              registered: item
            , dependencies: newDependencies
          })
        })
      } else {
        new Item(toRegister).save((err, item) => {
          if(err) throw err

          return done(null, {
              registered: item
            , dependencies: newDependencies
          })
        })
      }
    }

    async.map(toRegister.recipe, registerIngredient, (error, result) => {
      if (error) throw error
      toRegister.recipe = result
      return saveRegisteredItem()
    })

  }
}

module.exports = mongoose.model('Item', itemSchema)
