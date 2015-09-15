var express = require('express')
  , router = express.Router()
  , async = require('async')
  , Deck = require('models/deck')

router.get('/', function(req, res) {
  req.body = req.body || {}
  Deck
    .find(req.body)
    .populate('cards')
    .exec((err, allDecks) => {
    console.log(allDecks)
    // allDecks.map((deck) => deck.remove())
    return res.send(allDecks);
  })
})

router.get('/:deckName', function(req, res) {
  Deck
    .find({name: req.params.deckName})
    .populate('cards')
    .exec((err, deck) => {
    return res.send(deck);
  })
})

router.post('/additems/:deckName/', function(req, res) {
  Deck.addItems(req.params.deckName, req.body, (err, data) => {
    // return res.send(data)
  })
})

router.post('/removeitems/:deckName/', function(req, res) {
  Deck.removeItems(req.params.deckName, req.body, (err, data) => {
    // return res.send(data)
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
