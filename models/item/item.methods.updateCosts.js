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
    stackSize = 5
  }
  if(stackSize <= 0) {
    console.log('stackSize exceeded')
    return done(true)
  }
  stackSize--;

  var update = (next) => {
    this._parents = _.unique(this._parents, ObjectId => '' + ObjectId)
    console.log(this.price)
    updateParents(() => false)
    return saveThis(next)
  }

  var saveThis = (next) => {
    console.log('save | ', this.name)

    var oldThis = _.assign({}, this)
    this.save(next)
  }

  var updateParents = (next) => {
    // console.log('updateParents')
    var child = _.assign({},child)
    var updated = [].push(child)

    async.each(this._parents
      , (parentId, _next) => {
          Item.findById(parentId, (err, parent) => parent ? parent.updateCosts(stackSize, _next) : next())
      }
    )
  }

  this.calcCost((err, cost) => {
    this.cost = cost
    update(done)
  })


}
