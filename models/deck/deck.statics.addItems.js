var mongoose = require('mongoose')
  , _ = require('lodash')
  , async = require('async')


/* ===================== //
// addItems
// ===================== */
module.exports = (name, itemIds, done) => {
  let Deck = mongoose.model('Deck')
  let Item = mongoose.model('Item')

  let addItems = (err, deck) => {
    if (err) throw err;
    console.log(deck)
    if(deck && itemIds) {
      deck.cards = deck.cards || []
      deck.cards = _.uniq(deck.cards.concat(itemIds))
      deck.save(done)
    }
  }

  Deck.findOne({name}, addItems)
  async.map(itemIds, (itemId, next) => {
    Item.findById(itemId, (err, item) => {
      if (err) throw err;

      if(item) {
        item.deck = name
        return item.save(next)
      } else {
        return next()
      }
    })
  })
}
