import {curry, sortBy, compose, prop, reverse, groupBy, concat, identity} from 'ramda'
import {remove as removeDiacritics} from 'diacritics'

export const sortFn = curry(({property, order}, list) => {
  return compose(
    makeSortOrderFn(property, order),
    makeSortPropFn(property),
  )(list)
  // return compose(
  //   makeOrderFn(property, order),
  //   makeSortFn(property),
  // )(list)
})
export default sortFn

export const makeSortPropFn = (propName) => {
  const sortFns = {
    'benefits': ({price, cost}) => price - cost,
    'benefitsRate': ({price, cost}) => (price - cost) / cost,
    'price': prop('price'),
    'cost': prop('cost'),
    'alphabetical': compose(removeDiacritics, prop('name')),
  }
  return sortBy(sortFns[propName])
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
