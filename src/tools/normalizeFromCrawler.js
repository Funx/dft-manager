import {prop, pipe, filter, groupBy} from 'ramda'
import {toMap} from 'utils/iterable'

import {calcCosts} from './calcCosts'

export const normalizeDB = pipe(
  filter(prop('name')),
  attachMetadata,
  toMap,
  calcCosts,
)

export function attachMetadata (list) {
  const hueMap = generateHueMap(list)

  return list
    .map(obj => ({
      ...obj,
      hue: hueMap[obj.type],
    }))
}

export default attachMetadata

function generateHueMap(list) {
  const types = groupBy(prop('type'), list)
  const typeNames = Object.keys(types)
  const colorMap = typeNames
    .reduce((acc, key, index) => {
      const hue = Math.round(index * 360 / typeNames.length)
      return {
        ...acc,
        [key]: hue,
      }
    }, {})

  return colorMap
}
