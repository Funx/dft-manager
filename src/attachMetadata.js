import {groupBy, prop} from 'ramda'

export function attachMeta (list) {
  const hueMap = generateHueMap(list)

  return list
    .map(obj => ({
      ...obj,
      id: obj.id.match(/\d+-(.*)/)[1], // remove the numbers (1556-xyz -> xyz)
      recipe: obj.recipe.map(x => ({...x, id: x.id.match(/\d+-(.*)/)[1]})), // same thing
      hue: hueMap[obj.type],
      price: proba(1/20) ? 0 : randomInterval(...priceInterval(obj.type)),
      favorites: isComplex(obj) ? proba(1/5) : false,
      crafts: isComplex(obj) ? randomInterval(0, 1) : 0,
      stocks: isComplex(obj) ? randomInterval(0, 2) : 0,
      sold: isComplex(obj) ? randomInterval(0, 25) : 0,
      latestUpdate: Date.now() + randomInterval(0, 10000000) - 1000000,
    }))
    .map(x => ({
      ...x,
      outdated: (x.latestUpdate <= Date.now()),
    }))
}

export default attachMeta

const isComplex = (obj) => obj.recipe && obj.recipe.length

function priceInterval (type) {
  const intervals = {
    'Trophée': [50000, 4000000],
    'Idole': [50000, 4000000],
    'default': [1000, 15000],
  }
  return intervals[type] || intervals.default
}

function proba (proba) {
  return (Math.random() < proba)
}

function randomInterval (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateHueMap(list) {
  const types = groupBy(prop('type'), list)
  const typeNames = Object.keys(types)
  const colorMap = typeNames
    .reduce((acc, key, index) => {
      const hue = Math.round(index * 360 / typeNames.length)
      acc[key] = hue //esline-disable-line immutable/no-mutation
      return acc
    }, {})

  return colorMap
}
