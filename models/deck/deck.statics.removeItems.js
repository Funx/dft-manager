var mongoose = require('mongoose')
  , _ = require('lodash')
  , async = require('async')


/* ===================== //
// removeItems
// ===================== */
module.exports = (name, itemIds, done) => {
  let Deck = mongoose.model('Deck')
  let Item = mongoose.model('Item')

  let removeItems = (deck) => {
    deck.cards = deck.cards.filter((cardId) =>
      !itemIds.some((itemId) => '' + itemId == '' + cardId)
    )
    deck.save(done)
  }

  if (name == 'all') {
    Deck.find({}).exec((err, decks) => decks.forEach(removeItems))
  } else {
    Deck.findOne({name}, (err, deck) => removeItems(deck))
  }

  async.map(itemIds, (itemId, next) => {
    Item.findById(itemId, (err, item) => {
      if (err) throw err;

      if(item) {
        item.deck = null
        return item.save(next)
      } else {
        return next()
      }
    })
  })
}
