import {allPass, filter, always} from 'ramda'
import {remove as removeDiacritics_} from 'diacritics'
function removeDiacritics (str = '') {
  return removeDiacritics_(str)
}

export function makeFilterer ({query, currentCategories}) {
  return filter(allPass([
    queryPredicate(query),
    categoriesPredicate(currentCategories),
  ]))
}
export default makeFilterer

export function queryPredicate (queryStr = '') {
  const queries = queryStr.trim().split(' ')

  return allPass([
    x => x.name,
    ...queries.map(query => {
      const chunks = query.split(':').reverse()
      const word = chunks[0]
      const props = chunks[1] ? [chunks[1]] : ['name', 'type']

      // "!notThis" "!notThat"
      if (word.charAt(0) == '!') {
        return (word.length <= 2)
          ? always(true)
          : x => !props.some(matchProp(x, word.replace('!', '')))
      }

      // "this" "that"
      return x => props.some(matchProp(x, word))
    }),
  ])


  function matchProp (x, query) {
    return prop => regexp(removeDiacritics(query))
      .test(removeDiacritics(x[prop]))
  }
}

function categoriesPredicate (cats) {
  const activeCategories = Object.keys(cats)
    .filter(key => (cats[key] == true) && (key != 'all'))

  return item => cats.all || activeCategories.length
    ? activeCategories.every(key => Boolean(item[key]))
    : false
}

function regexp (x) {
  return new RegExp(x, 'gi')
}
