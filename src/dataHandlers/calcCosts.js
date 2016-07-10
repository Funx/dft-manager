export function calcCosts (db) {
  return db.map(x => ({
    ...x,
    cost: cost(db, x),
  }))
}

export default calcCosts

function cost (db, x) {
  if (!isRecipeValid(db, x.recipe)) return x.price
  return x.recipe.reduce(sum, 0)

  function sum (acc, {id, quantity}) {
    const itemCost = cost(db, db.get(id))
    return acc + Number(quantity) * itemCost
  }
}

export function isRecipeValid (db, recipe) {
  return Array.isArray(recipe)
    && recipe.length > 0
    && recipe.every(x => isIngredientValid(db, db.get(x.id)))
}

export function isIngredientValid (db, ingr) {
  return ingr && (ingr.price || isRecipeValid(db, ingr.recipe))
}
