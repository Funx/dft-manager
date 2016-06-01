import {curry, sortBy, compose, prop, reverse, groupBy, concat, identity} from 'ramda'
import {remove as removeDiacritics} from 'diacritics'

export const sortFn = curry(({property, order}, list) => {
  const sortFunction = getSortFn(property)
  const orderFunction = getOrderFn(property, order)
  return orderFunction(sortFunction(list))
})
export default sortFn

const getSortFn = (propName) => {
  const sortFns = {
    'benefits': ({price, cost}) => price - cost,
    'benefitsRate': ({price, cost}) => (price - cost) / cost,
    'price': prop('price'),
    'cost': prop('cost'),
    'alphabetical': compose(removeDiacritics, prop('name')),
  }
  return sortBy(sortFns[propName])
}

const getOrderFn = (prop, order) => {
  const maybeReverse = (order == 'ascending') ? identity : reverse
  const orderFns = {
    'benefits': putEmptyRecipesLast,
    'benefitsRate': putEmptyRecipesLast,
    'default': identity,
  }
  const orderFn = orderFns[prop] || orderFns.default
  return compose(orderFn, maybeReverse)
}

const putEmptyRecipesLast = (x) => {
  const {withRecipes, withoutRecipes} = groupByRecipeLength(x)
  return concat(withRecipes, withoutRecipes)
}

const groupByRecipeLength = (list) => {
  const emptyRecipe = x => x.recipe.length ? 'withRecipes' : 'withoutRecipes'
  return groupBy(emptyRecipe, list)
}
