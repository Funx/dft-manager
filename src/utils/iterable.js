import {curry} from 'ramda'

const toPairsByKey = curry((key, x) => [x[key], x])
// const toPairs = toPairsByKey('id')
export const fromArrayToMapByKey = curry((key, list) =>
  new Map(list.map(toPairsByKey(key))))
export const fromArrayToMap = fromArrayToMapByKey('id')

export const fromMapToArray = (map) => [...map].map(x => x[1])
export const mergeMaps = (map1, map2) => new Map([...map1, ...map2])

export const mergeArrayInMapByKey = curry((key, map_, arr) => {
  return mergeMaps(map_, fromArrayToMapByKey(key, arr))
})
export const mergeArrayInMap = mergeArrayInMapByKey('id')
export const mergeArraysByKey = curry((key, arr1, arr2) =>
  fromMapToArray(
    mergeArrayInMapByKey(key,
      fromArrayToMapByKey(key, arr1), arr2)))

export const mergeArrays = mergeArraysByKey('id')

// const original = new Map([
//   ['doNotEdit', 'prev'],
//   ['toEdit', 'prev'],
// ])
// const edit = new Map([
//   ['toEdit', 'new'],
//   ['newItem', 'new'],
// ])
// const result = mergeMaps(original, edit)
// console.log('mergeMaps', result)
