var mongoose = require('mongoose')
  , _ = require('lodash')
  , async = require('async')

/* ===================== //
// public item.updateCosts
// stackSize: Number
// done: callBack function({
// })
// ===================== */
module.exports = function updateCosts (stackSize, done) {
  let Item = mongoose.model('Item')

  if(!done) {
    done = stackSize
    stackSize = 10
  }
  if(stackSize <= 0) {
    console.log('stackSize exceeded')
    return done(true)
  }
  stackSize--;

  var update = (next) => {
    updateParents(() => false)
    return async.series([
      updateParents
      ,saveThis
    ], next)
  }

  var saveThis = (next) => {
    this._parents = _.unique(this._parents, ObjectId => '' + ObjectId)
    this._parents = _.filter(this._parents, ObjectId => !('' + ObjectId == this._id))
    this.save(next)
  }

  var updateParents = (next) => {
    // console.log('updateParents')
    var child = _.assign({},child)
    var updated = [].push(child)
    this._parents
    async.each(this._parents
      , (parentId, _next) => {
          Item.findById(parentId, (err, parent) =>
            parent ? parent.updateCosts(stackSize, _next) : _next()
          )
      }
      , next
    )
  }

  // console.log('update cost |', this.name)
  return async.series([
    (next) => this.calcCost((err, cost) => {
      this.cost = cost
      next()
    })
    , saveThis
    , updateParents
  ]
  , done)



}
