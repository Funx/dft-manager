var mongoose = require('mongoose')
  , _ = require('lodash')
  , async = require('async')

module.exports = function preItemRemove (done) {
  let Item = mongoose.model('Item')

  function saveBeforeDeletion(next) {
    console.log('item to remove :', item.name)

  }
  let removeFromParentsRecipes = (parent, next) => {
    console.log('remove this from :', parent, '\'s recipes')
    async.waterfall([
       (next) => Item.findById(parent, next)
      ,(parent, next) => {
        console.log('parent:', parent)
        if(parent && parent.recipe) {
          parent.recipe = _.filter((dosage) => {
            return '' + dosage._ingredient != '' + this._id
          })
          parent.save(next)
        } else {
          next()
        }
      }
    ], next)
  }

  let removeFromIngredientsParents = (dosage, next) => {
    console.log('remove this from :', dosage._ingredient, '\'s parents')

    async.waterfall([
       (next) => Item.findById(dosage._ingredient, next)
      ,(ingredient, next) => {
        console.log('ingredient:', ingredient)
        if(ingredient && ingredient._parents) {
          ingredient._parents = _.filter((parent) => {
            return '' + parent != '' + this._id
          })
          ingredient.save(next)
        } else {
          next()
        }
      }
    ], next)
  }
  console.log('pre remove')
  console.log(this)

  async.parallel([
      next => async.each(this._parents, removeFromParentsRecipes, next)
    , next => async.each(this.recipe, removeFromIngredientsParents, next)
  ], done)
}
