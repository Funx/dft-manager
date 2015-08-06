var mongoose = require('mongoose')
  , isValidObjectID = require('helpers/isValidObjectID')
  , _ = require('lodash')

/* ===================== //
// public static Item.exists
// toTest: ObjectId, {_id}, {name}
// done: callBack function(Item|false)
// ===================== */
module.exports = function itemExists (toTest, done) {
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
