import {curry, sortBy, compose, pipe, prop, reverse, groupBy, concat, identity, toLower} from 'ramda'
import {remove as removeDiacritics} from 'diacritics'

export const sortFn = curry(({property, order}, list) => {
  return pipe(
    makeSortPropFn(property),
    // makeSortOrderFn(property, order),
  )(list)
  // return compose(
  //   makeOrderFn(property, order),
  //   makeSortFn(property),
  // )(list)
})
export default sortFn

export const makeSortPropFn = (propName) => {
  const sortFns = {
    'benefits': compose(
      sortBy(({price, cost}) => (price == 0 && cost > 0) ? 2 : 1), // put them first
      sortBy(({price, cost}) => price - cost),
    ),
    'benefitsRate': sortBy(({price, cost}) => (price - cost) / cost),
    'price': sortBy(prop('price')),
    'cost': sortBy(prop('cost')),
    'alphabetical': sortBy(compose(removeDiacritics, toLower, prop('name'))),
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

export const putEmptyRecipesLast = (x) => {
  const {withRecipes, withoutRecipes} = groupByRecipeLength(x)
  return concat(withRecipes, withoutRecipes)
}

export const groupByRecipeLength = (list) => {
  const emptyRecipe = x => x.recipe.length ? 'withRecipes' : 'withoutRecipes'
  return groupBy(emptyRecipe, list)
}
