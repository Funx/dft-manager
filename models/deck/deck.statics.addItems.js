var mongoose = require('mongoose')
  , _ = require('lodash')


/* ===================== //
// addItems
// ===================== */
module.exports = (name, itemIds, done) => {
  let Deck = mongoose.model('Deck')

  let addItems = (err, deck) => {
    if (err) throw err;

    deck.cards = deck.cards.concat(itemIds)
    deck.save(done)
  }

  Deck.find({name}, addItems)
}
