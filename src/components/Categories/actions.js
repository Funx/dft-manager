import {mapObjIndexed, pipe} from 'ramda'

export const toggleAll = bool => dict => {
  if (bool) {
    return {
      ...setKeys(false, dict),
      all: bool,
    }
  } else {
    return {
      ...dict,
      all: bool,
    }
  }
}

export const toggleProp = prop => bool => pipe(
    dict => ({...dict, [prop]: bool}),
    dict => ({
      ...dict,
      all: mapObjKeys((value, key) => ({key, value}), dict)
        .filter(x => x && x.key != 'all')
        .every(x => !x.value),
    })
  )

const setKeys = (val, obj) => mapObjIndexed(() => val, obj)
const mapObjKeys = (fn, obj) => Object.keys(obj).map(key => fn(obj[key], key))
