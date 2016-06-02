import {curry, sortBy, compose, pipe, prop, reverse, groupBy, concat, identity, toLower, sort} from 'ramda'
import {remove as removeDiacritics} from 'diacritics'
import firstBy from 'thenby'

export const sortFn = curry(({property, order}, list) => {
  return pipe(
    makeSortPropFn(property),
    makeSortOrderFn(property, order),
  )(list)
})
export default sortFn

export const makeSortPropFn = (propName) => {
  const emptyPriceTop = ({price, recipe}) => (price == 0 && recipe.length) ? 2 : 1
  const sortFns = {
    'price': sort(
      firstBy('price')
      .thenBy(emptyPriceTop)
    ),
    'cost': sortBy(prop('cost')),
    'alphabetical': sortBy(compose(removeDiacritics, toLower, prop('name'))),
    'benefits': sort(
      firstBy('cost')
      .thenBy(({price, cost}) => price - cost)
      .thenBy(emptyPriceTop)
    ),
    'benefitsRate': sort(
      firstBy('cost')
      .thenBy(({price, cost}) => (price - cost) / cost)
      .thenBy(emptyPriceTop)
    )
    // const putEmptyPriceTop = xs => {
    //   const {first, last} = groupBy(({price, recipe}) => (price == 0 && recipe.length) ? 'last' : 'first')(xs)
    //   return concat(first || [], last || [])
    // }
  // const sortFns = {
  //   'price': pipe(
  //     sortBy(prop('price')),
  //     putEmptyPriceTop,
  //   ),
  //   'cost': sortBy(prop('cost')),
  //   'alphabetical': sortBy(compose(removeDiacritics, toLower, prop('name'))),
  //   'benefits': pipe(
  //     sortBy(prop('cost')),
  //     sortBy(({price, cost}) => price - cost),
  //     putEmptyPriceTop,
  //   ),
  //   'benefitsRate': pipe(
  //     sortBy(prop('cost')),
  //     sortBy(({price, cost}) => ((price - cost) / cost)),
  //     // putEmptyPriceTop,
  //   ),
  }
  return sortFns[propName]
}

export const makeSortOrderFn = (prop, order) => {
  const reverseFn = {
    'ascending': identity,
    'descending': reverse
  }
  const orderFns = {
    'benefits': putEmptyRecipesLast,
    'benefitsRate': putEmptyRecipesLast,
    'default': identity,
  }
  return pipe(
    reverseFn[order],
    orderFns[prop] || orderFns.default,
  )
}

export const putEmptyRecipesLast = (xs) => {
  const {first, last} = groupBy(({recipe}) => (recipe && recipe.length) ? 'first' : 'last')(xs)
  return concat(first || [], last || [])
}
