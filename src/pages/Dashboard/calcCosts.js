import {fromMapToArray} from 'utils/iterable'

export function calcCosts (db) {
  return new Map(
    fromMapToArray(db)
      .map(x => ({
        ...x,
        cost: cost(db, x),
      }))
      .map(x => [x.id, x])
    )
}

export default calcCosts

function cost (db, x) {
  // if (!x) return 'invalid'
  if (!x) return 0

  const sum = (acc, {id, quantity}) => {
    // if (typeof acc == 'string' && acc.indexOf('invalid') != -1) return acc
    const itemCost = cost(db, db.get(id))
    // if (typeof itemCost == 'string' && itemCost.indexOf('invalid') != -1) return itemCost + id
    return acc + Number(quantity) * itemCost
  }
  return (!x.recipe || !x.recipe.length)
    ? Number(x.price)
    : x.recipe.reduce(sum, 0)
}
