var mongoose = require('mongoose')


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

      var cost = this.recipe.reduce((cost, dosage) => {
        return cost + dosage.quantity * dosage._ingredient.cost || dosage._ingredient.price
      }, 0)
      return done(null, this.cost)
    })
  }
}
