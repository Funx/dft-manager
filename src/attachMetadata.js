import {groupBy, prop} from 'ramda'

export function attachMeta (list) {
  const hueMap = generateHueMap(list)

  return list
    .map(obj => ({
      ...obj,
      hue: hueMap[obj.type],
      price: randomInterval(...piceInterval(obj.type)),
      favorites: proba(1/5),
      stocks: proba(1/10),
      crafts: proba(1/20),
      outdated: proba(1/30),
    }))
}

export default attachMeta

function piceInterval (type) {
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
