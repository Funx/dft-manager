import {sortBy, compose, prop, pipe, filter} from 'ramda'
import bdd from './bdd'

const sortByNameCaseInsensitive = sortBy(compose(prop('name')))
const normalizeBdd = pipe(
  filter(prop('name')),
  sortByNameCaseInsensitive,
)

export const initialState = {
  route: {pathname: '/'},
  items: normalizeBdd(bdd),
  sortProp: 'fixed-benefits',
  sortOrder: 'descending',
  currentCategories: {
    favorites: true,
    stocks: true,
    crafts: true,
    outdated: true,
  },
}

export default initialState
