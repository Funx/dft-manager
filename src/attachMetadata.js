import {groupBy, prop} from 'ramda'

export function attachMeta (list) {
  const hueMap = generateHueMap(list)

  return list
    .map(obj => ({
      ...obj,
      hue: hueMap[obj.type],
      price: randomInterval(1000, 1500000),
      cost: randomInterval(1000, 1500000),
      favorites: proba(1/5),
      stocks: proba(1/10),
      crafts: proba(1/20),
      outdated: proba(1/30),
    }))
}

export default attachMeta

function proba (proba) {
  return (Math.random() < proba)
}

function randomInterval (min, max) {
  return Math.floor(Math.random() * (max-min)) + min
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
