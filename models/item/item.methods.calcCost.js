var mongoose = require('mongoose')
  , _ = require('lodash')


/* ===================== //
// public item.updateCosts
// done: callBack function({
// })
// ===================== */
module.exports = function getCost (done) {
  let Item = mongoose.model('Item')

  if(!this.recipe.length) {
    return done(null, this.price)
  } else {
    Item.populate(this, 'recipe._ingredient', (err) => {
      if(err) throw err

      this.recipe = _.filter(this.recipe, dosage => !!dosage && !!dosage._ingredient)
      // console.log(this.name, '|', this.recipe)
      this.cost = this.recipe.reduce((cost, dosage) => {
        return cost + dosage.quantity * dosage._ingredient.cost || dosage._ingredient.price
      }, 0)

      if(!this.cost) console.log('!!!!', this.name, 'has no cost')
      return done(null, this.cost)
    })
  }
}
