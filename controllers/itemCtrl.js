var express = require('express')
  , router = express.Router()
  , async = require('async')
  , Item = require('models/item')


router.get('/id/:itemId', function(req, res) {
  Items.find({}).populate('recipe._ingredient').exec((err, allItems) => {
    return res.send(allItems);
  })
})

router.get('/name/:query_string', function(req, res) {
  if(req.params.query_string){
    Item.searchByName(req.params.query_string, 10, (err, items) => {
      if(err) throw err
      res.send(items)
    })
  }
})

router.get('/name/:itemName/category/:category', function(req, res) {
  if(req.params.name && req.params.category){
    Item.find({
      'name': {
        '$regex': req.params.name,
        '$options': 'i'
      },
      'category': req.params.category
    })
    .exec(function(err,items) {
      if(err) throw err
      if(items.length === 1) res.send(items[0])
      else res.send(false)
    })
  }
})

router.post('/', function(req, res) {
  Item.register(req.body, (err, data) => {
    console.log(data)
    return res.send(data)
  })
})

router.delete('/:id', function(req, res) {
  Item.findByIdAndRemove(req.params.id, (err, removed) => res.send())
})

module.exports = router
