import {mapObjIndexed} from 'ramda'

export const toggleAll = bool => dict => {
  return mapObjIndexed(() => bool, dict)
}
