import {curry, sortBy, compose, toLower, prop, reverse} from 'ramda'

export const sortFn = curry(({property, order}, list) => {
  const sortFunction = sortFnDict[property]
  const result = sortBy(sortFunction, list)
  return order == 'ascending' ? result : reverse(result)
})
export default sortFn

const sortFnDict = {
  'benefits': ({price, cost}) => price - cost,
  'benefitsRate': ({price, cost}) => (price - cost) / cost,
  'price': prop('price'),
  'cost': prop('cost'),
  'alphabetical': compose(toLower, prop('name')),
}
