import {curry} from 'ramda'

export const arrayToMapByKey = curry((key, list) =>
  new Map(list.map(x => [x[key], x])))
export const arrayToMap = arrayToMapByKey('id')

export const mapToArray = (map) => [...map].map(x => x[1])

export const mergeArrayInMapByKey = curry((key, map, arr) => {
  arr.forEach(x => map.set(x[key], x))
  return map
})
export const mergeArrayInMap = mergeArrayInMapByKey('id')
export const mergeArraysByKey = curry((key, arr1, arr2) =>
  mapToArray(mergeArrayInMapByKey(key, arrayToMapByKey(key, arr1), arr2)))
export const mergeArrays = mergeArraysByKey('id')

export const mergeMaps = (map1, map2) =>
  mergeArrayInMap(map1, mapToArray(map2))
