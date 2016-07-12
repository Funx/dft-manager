export function populateRandomData (list) {
  return list
    .map(obj => {
      const latestUpdate = Date.now() + randomInterval(0, 10000000) - 1000000
      return {
        ...obj,
        price: proba(1/20) ? 0 : randomInterval(...priceInterval(obj.type)),
        favorites: isComplex(obj) ? proba(1/5) : false,
        crafts: isComplex(obj) ? randomInterval(0, 1) : 0,
        stocks: isComplex(obj) ? randomInterval(0, 2) : 0,
        sold: isComplex(obj) ? randomInterval(0, 25) : 0,
        outdated: latestUpdate <= Date.now(),
        latestUpdate,
      }
    })
}
export default populateRandomData

const isComplex = (obj) => obj.recipe && obj.recipe.length

function priceInterval (type) {
  switch (type) {
    case 'Trophée': return [50000, 4000000]
    case 'Idole': return [50000, 4000000]
    default: return [100, 100000]
  }
}

function proba (proba) {
  return (Math.random() < proba)
}

function randomInterval (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
