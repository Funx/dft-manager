import {Map} from 'immutable'
import {curry} from 'ramda'

export const toMapByKey = curry((key, arr) => Map(arr.map(x => [x[key], x])))
export const toMap = toMapByKey('id')
