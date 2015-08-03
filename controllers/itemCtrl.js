var express = require('express')
  , router = express.Router()
  , Item = require('models/item')


router.get('/id/:itemId', function(req, res) {
  Items.find({}).populate('recipe._ingredient').exec((err, allItems) => {
    return res.send(allItems);
  })
})

router.get('/name/:itemName', function(req, res) {
  Items.find({}).populate('recipe._ingredient').exec((err, allItems) => {
    return res.send(allItems);
  })
})

router.get('/name/:itemName/category/:category', function(req, res) {
  Items.find({}).populate('recipe._ingredient').exec((err, allItems) => {
    return res.send(allItems);
  })
})

// search an item
router.get('/api/search/items/:category/:name', function(req, res){
  if(req.params.name && req.params.category){
    Item
    .find({
      'name': {
        '$regex': req.params.name,
        '$options': 'i'
      },
      'category': req.params.category
    })
    .limit(5)
    .populate('recipe._ingredient')
    .exec(function(err,items){
      if(err) throw err
      if(items.length === 1) res.send(items[0])
      else res.send(false)
    })
  }
})

router.post('/', function(req, res) {
  console.log('save item')
  var item = new Item(req.body)
  return item.save(req.body)
})

module.exports = router
