var mongoose = require('mongoose')
  , _ = require('lodash')
  , async = require('async')

module.exports = function preItemRemove (done) {
  let Item = mongoose.model('Item')

  function saveBeforeDeletion(next) {
    console.log('item to remove :', item.name)

  }
  function removeFromRecipes(parent, next) {
    console.log('remove this from :', parent, '\'s recipes')


    return next()
  }
  function removeFromParents(dosage, next) {
    console.log('remove this from :', dosage._ingredient, '\'s parents')

    async.waterfall([
       (next) => Item.findById(dosage._ingredient, next)
      ,(ingredient, next) => {
        console.log('ingredient:', ingredient)

        ingredient._parents = ingredient._parents.map(id => '' + id)
        ingredient._parents = _.without(['' + ingredient._id])

        ingredient.save(next)
      }
    ], next)
  }
  console.log('pre remove')
  console.log(this)

  async.parallel([
      next => async.each(this._parents, removeFromRecipes, next)
    , next => async.each(this.recipe, removeFromParents, next)
  ], done)
}
