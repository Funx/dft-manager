import {mapObjIndexed, pipe} from 'ramda'

export const toggleAll = bool => dict => {
  return bool
    ? {...setKeys(false, dict), all: bool}
    : {...dict, all: bool}
}

export const toggleProp = prop => bool => pipe(
    dict => ({...dict, [prop]: bool}),
    dict => ({
      ...dict,
      all: mapObjKeys((value, key) => ({key, value}), dict)
        .filter(x => x.key != 'all')
        .every(x => !x.value),
    }),
    // x => (console.log(x), x),
  )
  // const result = {...dict}
  // result[prop] = bool
  // result.all = mapObjKeys((value, key) => ({key, value}), result)
  //   .filter(x => x.key != 'all')
  //   .every(x => !x.value)
  // return result


const setKeys = (val, obj) => mapObjIndexed(() => val, obj)
const mapObjKeys = (fn, obj) => Object.keys(obj).map(key => fn(obj[key], key))
