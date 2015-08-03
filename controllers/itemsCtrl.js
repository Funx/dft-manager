var express = require('express')
  , router = express.Router()
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

// items/collection/:collectionId
router.get('/collection/:collectionId', function(req, res) {
  Items.find({_id: req.params.collectionId }).exec((err, items) => {
    return res.send(items);
  })
})

module.exports = router
