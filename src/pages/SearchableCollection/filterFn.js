import {remove as removeDiacritics_} from 'diacritics'
function removeDiacritics (str = '') {
  return removeDiacritics_(str)
}

export function filterFn (query, list) {
  // const applyVisibityAttr = item => ({...item, visible: visibilityFilter(item)})

  return list
    // .map(applyVisibityAttr)
    .filter(filterBy(query))
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
