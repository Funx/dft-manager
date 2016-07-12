import {prop, map, pipe, filter, groupBy, keys, allPass, identity} from 'ramda'
import {checkCrawlerResults} from './checkCrawlerResults'

export function prepareDatabase (list) {
  checkCrawlerResults(list)

  const items = pipe(
    map(prop('pageFunctionResult')),
    filter(allPass([identity, prop('name')])),
  )(list)

  const hueMap = generateHueMap(items)
  return map(obj => ({
    ...obj,
    hue: hueMap[obj.type],
    price: 0,
    favorites: false,
    crafts: 0,
    stocks: 0,
    sold: 0,
    outdated: true,
    latestUpdate: 0,
  }), items)
}

export default prepareDatabase

function generateHueMap(list) {
  const types = keys(groupBy(prop('type'), list))
  return types.reduce(
    (acc, key, index, arr) => {
      const hue = Math.round(index * 360 / arr.length)
      return {
        ...acc,
        [key]: hue,
      }
    }, {})
}
