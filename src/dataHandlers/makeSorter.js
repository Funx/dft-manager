import {sortBy, compose, prop, toLower, sort} from 'ramda'
import {remove as removeDiacritics} from 'diacritics'
import firstBy from 'thenby'

export function makeSorter ({property = 'alphabetical', ascending = true}) {
  const direction = ascending ? 1 : -1

  const sorters = {
    price: sort(
      firstBy(emptyPriceTop, {direction})
      .thenBy('price', {direction})
    ),
    cost: sortBy(prop('cost')),
    alphabetical: sort(firstBy(alphabetical, {direction})),
    level: sort(
      firstBy('level', {direction})
      .thenBy(alphabetical, {direction})
    ),
    benefits: sort(
      firstBy(emptyRecipesLast)
      .thenBy(emptyPriceTop, {direction})
      .thenBy(({price, cost}) => price - cost, {direction})
      .thenBy('cost', {direction})
    ),
    benefitsRate: sort(
      firstBy(emptyRecipesLast)
      .thenBy(emptyPriceTop, {direction})
      .thenBy(({price, cost}) => (price - cost) / cost, {direction})
      .thenBy('cost', {direction})
    ),
  }

  return sorters[property]
}
export default makeSorter


const emptyPriceTop = ({price, recipe, cost}) =>
  (price == 0 && recipe.length && cost > 0) ? 2
  : (price == 0 && recipe.length) ? 1
  : 0
const emptyRecipesLast = ({recipe}) => (recipe && recipe.length) ? 0 : 1
const alphabetical = compose(removeDiacritics, toLower, prop('name'))
