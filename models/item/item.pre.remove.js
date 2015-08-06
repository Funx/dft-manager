var mongoose = require('mongoose')
  , _ = require('lodash')
  , async = require('async')

module.exports = function preItemRemove (item, done) {
  function saveBeforeDeletion(next) {

  }
  function removeFromRecipes(dosage, next) {
    console.log('dosage to remove from :', dosage)
    next()
  }
  function removeFromParents(parent, next) {
    console.log('parent to remove from :', dosage)
    next()
  }
  async.parallel([
    , saveBeforeDeletion
    , next => async.each(item._parents, removeFromRecipes, next)
    , next => async.each(item.recipe, removeFromParents, next)
  ], done)
}
