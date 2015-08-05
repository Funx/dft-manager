// models/item.js
var mongoose = require('mongoose')
  , createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin
  , async = require('async')
  , _ = require('lodash')


var Schema = mongoose.Schema
  , SchemaObjectId = mongoose.Schema.Types.ObjectId
  , isValidObjectID = require('helpers/isValidObjectID')

var dosageSchema = new Schema({
      _ingredient: { type: SchemaObjectId, ref: 'Item' }
    , quantity: Number
  })

var itemSchema = new Schema({
      name: String
    , type: String
    , category: String
    , recipe: [dosageSchema]
    , _parents: [{ type: SchemaObjectId, ref: 'Item' }]
    , price: Number
    , cost: Number
  })
  .plugin(createdModifiedPlugin, { index: true })
  .set('toJSON', { virtuals: true })
  .set('toObject', { virtuals: true })

  .post('save', (item) => {
    // item.updateCosts((err, updated) => {
    //   console.log('updated', updated.length)
    // })
  })

itemSchema.statics = {
  /* ===================== //
  // public static Item.exists
  // toTest: ObjectId, {_id}, {name}
  // done: callBack function(Item|false)
  // ===================== */
  exists: function itemExists (toTest, done) {
    let Item = this.model('Item')


    function testById (toTest, next) {
      if (toTest) {
        let id = isValidObjectID(toTest) ? toTest : toTest._id
        return Item.findById(id).exec(next)
      } else {
        return next(null, false)
      }
    }

    function testByName (toTest, next) {
      var name = toTest
      if (toTest && _.isObject(toTest)) {
        name = toTest.name
      }
      if (name) {
        Item.find({'name': name})
        .exec((err, result) => {
          if(err) throw err
          result = result ? result[0] : false
          return next(null, result)
        })
      } else {
        return next(null, false)
      }
    }


    testById(toTest, (err, response) => {
      if(response) {
        done(err, response)
      } else {
        testByName(toTest, done)
      }
    })

  }
  /* ===================== //
  // public static Item.register
  // freshModel: {}
  // done: callBack function({
  //  registered: Item,
  //  dependencies: [Item] (newly created dependencies)
  // })
  // ===================== */
  , register: function registerItem (rawModel, parent, done) {
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

    function updateCosts (_item, next) {
      if(!_item.cost || (oldModel && _item.price != oldModel.price)) {
        return _item.updateCosts(next)
      } else {
        return next()
      }
    }

    function save (next) {
      freshModel.updateCosts((err, _item, updated) => {
        Item.populate(_item, '_parents', (err, _item) => {
          if(err) throw err
          newDependencies = _.unique(newDependencies)
          return next(null, {
              registered: _item
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
        freshModel = _.assign(item, freshModel)
      }

      return async.series([
        registerRelationships
      ], () => save(done))
    })

  }

  /* ===================== //
  // public static Item.searchByName
  // query: String
  // limit: Number?
  // done: callBack function([Item])
  // ===================== */
  , searchByName: function searchItemByName (query, limit, done) {
    let Item = this.model('Item')

    if (!done) {
      done = limit
      limit = 50
    }

    Item.find({
      'name': {
        '$regex': query,
        '$options': 'i'
      }
    })
    .limit(limit)
    .exec((err, items) => {
      if(err) throw err
      done(null, items)
    })
  }
}

itemSchema.methods = {
  /* ===================== //
  // public Item.updateCosts
  // freshModel: {}
  // done: callBack function({
  //  registered: Item,
  //  dependencies: [Item] (newly created dependencies)
  // })
  // ===================== */
  updateCosts: function updateCosts (stackSize, done) {
    if(!done) {
      done = stackSize
      stackSize = 5
    }
    if(stackSize <= 0) {
      console.log('stackSize exceeded')
      return done(true)
    }
    stackSize--;

    let Item = mongoose.model('Item')

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

    if(!this.recipe.length) {
      this.cost = this.price
      return update(done)
    } else {
      Item.populate(this, 'recipe._ingredient', (err) => {
        if(err) throw err

        this.cost = this.recipe.reduce((cost, dosage) => {
          return cost + dosage.quantity * dosage._ingredient.cost || dosage._ingredient.price
        }, 0)
        return update(done)
      })
    }
  }
}

module.exports = mongoose.model('Item', itemSchema)
