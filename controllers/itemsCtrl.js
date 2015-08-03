var express = require('express')
  , router = express.Router()
  , Item = require('models/item')
  , Items = require('models/items')

router.get('/items/collection/all', function(req, res) {
  Item
    .find({})
    .populate('recipe._ingredient')
    .exec()
    .then((err, allItems) => res.send(allItems))
})

router.get('/items/collection/:collectionId', function(req, res) {
  Items.find({_id: req.params.collectionId }).exec((err, items) => {
    return res.send(items);
  })
})

module.exports = router
