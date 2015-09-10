var mongoose = require('mongoose')
  , _ = require('lodash')


/* ===================== //
// removeItems
// ===================== */
module.exports = (name, itemIds, done) => {
  let Deck = mongoose.model('Deck')

  let removeItems = (err, deck) => {
    if (err) throw err;

    deck.cards = deck.cards.filter((cardId) =>
      !itemIds.some((itemId) => '' + itemId == '' + cardId)
    )
    deck.save(done)
  }

  Deck.find({name}, addItems)
}
