import {curry, sortBy, compose, pipe, prop, reverse, groupBy, concat, identity, toLower} from 'ramda'
import {remove as removeDiacritics} from 'diacritics'

export const sortFn = curry(({property, order}, list) => {
  return pipe(
    makeSortPropFn(property),
    makeSortOrderFn(property, order),
  )(list)
})
export default sortFn

export const makeSortPropFn = (propName) => {
  const validEmptyPriceIsMax = ({price, cost}) => (price == 0 && cost > 0) ? 2 : 1
  const sortFns = {
    'price': sortBy(prop('price')),
    'cost': sortBy(prop('cost')),
    'alphabetical': sortBy(compose(removeDiacritics, toLower, prop('name'))),
    'benefits': compose(
      sortBy(validEmptyPriceIsMax), //valid items without price first
      sortBy(({price, cost}) => price - cost),
    ),
    'benefitsRate': compose(
      sortBy(validEmptyPriceIsMax),
      sortBy(({price, cost}) => (price - cost) / cost),
    ),
  }
  return sortFns[propName]
}

export const makeSortOrderFn = (prop, order) => {
  const maybeReverse = (order == 'ascending') ? identity : reverse
  const orderFns = {
    'benefits': putEmptyRecipesLast,
    'benefitsRate': putEmptyRecipesLast,
    'default': identity,
  }
  const orderFn = orderFns[prop] || orderFns.default
  return compose(orderFn, maybeReverse)
}

export const putEmptyRecipesLast = (list) => {
  const emptyRecipe = x => x.recipe.length ? 1 : 2
  return sortBy(emptyRecipe, list)
}
