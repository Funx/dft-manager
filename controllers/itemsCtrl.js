var express = require('express')
  , router = express.Router()
  , async = require('async')
  , Item = require('models/item')
  , Items = require('models/items')

// items/all
router.get('/all', function(req, res) {
  console.log('get /items/all')
  Item
    .find({})
    .populate('recipe._ingredient')
    .exec((err, allItems) => {
      console.log(`served ${allItems.length} items !`)
      return res.send(allItems)
    })

})

router.get('/register/all', function(req, res) {
  Item
  .find({})
  .exec((err, allItems) => {
    async.forEach(
      allItems
    , (item, next) => Item.register(item, next)
    , () => {
        console.log('updated everything'), res.send()
      }
    )
  })

})

// items/collection/:collectionId
router.get('/collection/:collectionId', function(req, res) {
  Items.find({_id: req.params.collectionId }).exec((err, items) => {
    return res.send(items);
  })
})

module.exports = router
