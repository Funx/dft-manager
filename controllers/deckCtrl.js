var express = require('express')
  , router = express.Router()
  , async = require('async')
  , Deck = require('models/deck')

router.get('/', function(req, res) {
  Deck.find({}).exec((err, allDecks) => {
    console.log(allDecks)
    // allDecks.map((deck) => deck.remove())
    return res.send(allDecks);
  })
})

router.get('/:name', function(req, res) {
  Deck.find({name: req.params.name}).exec((err, deck) => {
    return res.send(deck);
  })
})

router.post('/:name/additems/', function(req, res) {
  let itemIds = req.body.map((item) => item._id)

  Deck.addItems(req.params.name, itemIds, (err, data) => {
    return res.send(data)
  })
})

router.post('/:name/removeitems/', function(req, res) {
  let itemIds = req.body.map((item) => item._id)

  Deck.removeItems(req.params.name, itemIds, (err, data) => {
    return res.send(data)
  })
})

// let decks = [
//   {
//     name: 'watching'
//     ,cards : []
//   }
//   ,{
//     name: 'crafting'
//     ,cards : []
//   }
//   ,{
//     name: 'selling'
//     ,cards : []
//   }
// ]
//
// decks.map((deck) => {
//   deck = new Deck(deck)
//   deck.save()
// })

module.exports = router
