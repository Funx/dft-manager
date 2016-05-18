import {allPass, filter, curry} from 'ramda'
import {remove as removeDiacritics_} from 'diacritics'
function removeDiacritics (str = '') {
  return removeDiacritics_(str)
}

export const filterFn = curry(({query, currentCategories}, list) => {
  return filter(allPass([
    queryPredicate(query),
    categoriesPredicate(currentCategories),
  ]))(list)
})

function queryPredicate (queryStr = '') {
  const regexps = queryStr.trim()
    .split(' ')
    .map(removeDiacritics)
    .map(str => new RegExp(str, 'gi'))

  return (item) => Boolean(item.name)
    && regexps.every(test(item, ['name', 'type']))

  function test(item, props) {
    return regexp => props.some(prop =>
      regexp.test(removeDiacritics(item[prop]))
    )
  }
}

function categoriesPredicate (cats) {
  const activeCategories = Object.keys(cats)
    .filter(key => (cats[key] == true) && (key != 'all'))

  return item => cats.all || activeCategories.length
    ? activeCategories.every(key => Boolean(item[key]))
    : false
}
