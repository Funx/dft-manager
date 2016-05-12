import {groupBy, prop} from 'ramda'
import {remove as removeDiacritics_} from 'diacritics'
function removeDiacritics (str = '') {
  return removeDiacritics_(str)
}

export function filterFn (query, list) {
  const colorMap = generateColorMap(list)

  return list
    .map(obj => ({
      ...obj, color: colorMap[obj.type],
    }))
    .filter(filterBy(query))
}

function generateColorMap(list) {
  const types = groupBy(prop('type'), list)
  const typeNames = Object.keys(types)
  const colorMap = typeNames
    .reduce((acc, key, index) => {
      const hue = Math.round(index * 360 / typeNames.length)
      const color = `hsl(${hue}, 44%, 50%)`
      acc[key] = color //esline-disable-line immutable/no-mutation
      return acc
    }, {})

  return colorMap
}

function filterBy(queryStr = '') {
  const regexps = queryStr.trim()
    .split(' ')
    .map(removeDiacritics)
    .map(str => new RegExp(str, 'gi'))

  return (item) => item.name && regexps.every(test(item, ['name', 'type']))

  function test(item, props) {
    return regexp => props.some(prop =>
      regexp.test(removeDiacritics(item[prop]))
    )
  }

}
