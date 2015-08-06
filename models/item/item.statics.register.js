var _ = require('lodash')
  , async = require('async')

/* ===================== //
// public static Item.register
// freshModel: {}
// done: callBack function({
//  registered: Item,
//  dependencies: [Item] (newly created dependencies)
// })
// ===================== */
module.exports = function registerItem (rawModel, parent, done) {
  if(!done) {
    done = parent
    parent = null
  }

  var newDependencies = []
    , Item = this.model('Item')
    , oldModel
    , freshModel

  function registerRelationships (next) {
    return async.parallel([
        registerRecipe
      , registerParent
    ], next)
  }

  function registerParent (next) {
    if(!parent) {
      return next()
    } else {
      Item.exists(parent, (err, _parent) => {
        if(err) throw err
        // in parent found or if parent has an id (registering)
        if(_parent || parent._id) {
          _parent = _parent || parent
          freshModel._parents.push(_parent._id)
          freshModel._parents = _.unique(freshModel._parents, ObjectId => '' + ObjectId)
        }
        return next()
      })
    }
  }

  function registerRecipe (next) {
    let recipe = rawModel.recipe || []
    async.map(recipe, registerIngredient, (error, result) => {
      if (error) throw error
      freshModel.recipe = result
      return next()
    })
  }

  function registerIngredient (dosage, next) {
    let ingredientsParent = freshModel
    Item.register(dosage._ingredient, ingredientsParent, (err, data) => {
      if (err) throw (err)
      dosage._ingredient = data.registered._id
      if(data.isNew) {
        newDependencies.push(data.registered)
      }
      newDependencies = newDependencies.concat(data.dependencies)
      return next(null, dosage)
    })
  }

  function updateCost (next) {
    if(shouldUpdateCost()) {
      return freshModel.calcCost((err, cost) => {
        freshModel.cost = cost
        next()
      })
    } else {
      return next()
    }
  }

  function shouldUpdateCost () {
    return (!freshModel.cost || (oldModel && freshModel.price != oldModel.price))
  }

  function save (next) {
    console.log(freshModel.price)

    freshModel.save((err, _freshModel) => {
      Item.populate(_freshModel, 'recipe._ingredient', (err) => {
        if(err) throw err
        if(shouldUpdateCost) {
          freshModel.updateCosts(() => false)
        }
        console.log(freshModel)
        newDependencies = _.unique(newDependencies)
        return next(null, {
            registered: freshModel
          , dependencies: newDependencies
          , isNew: oldModel ? false : true
        })
      })
    })
  }

  Item.exists(rawModel, (err, item) => {
    if(err) throw err

    // keep it before it gets destroyed when creating an new item
    if(!item) {
      oldModel = false
      freshModel = new Item(freshModel)
    } else {
      oldModel = item
      freshModel = _.assign(item, rawModel)
    }

    return async.series([
      registerRelationships
    ], () => save(done))
  })

}
