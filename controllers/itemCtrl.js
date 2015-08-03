var express = require('express')
  , router = express.Router()
  , Item = require('models/item')


router.get('/item/find/by_id/:itemId', function(req, res) {
  Items.find({}).populate('recipe._ingredient').exec((err, allItems) => {
    return res.send(allItems);
  })
})

router.get('/item/find/by_name/:itemName', function(req, res) {
  Items.find({}).populate('recipe._ingredient').exec((err, allItems) => {
    return res.send(allItems);
  })
})

router.get('/item/find/by_name/:itemName/category/:category', function(req, res) {
  Items.find({}).populate('recipe._ingredient').exec((err, allItems) => {
    return res.send(allItems);
  })
})

router.post('/item', function(req, res) {
  Items.find({}).populate('recipe._ingredient').exec((err, allItems) => {
    return res.send(allItems);
  })
})

module.exports = router
