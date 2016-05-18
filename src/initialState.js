import {sortBy, compose, prop, pipe, filter} from 'ramda'
import bdd from './bdd'
import {attachMeta} from './attachMetadata'

const sortByNameCaseInsensitive = sortBy(compose(prop('name')))
const normalizeBdd = pipe(
  filter(prop('name')),
  sortByNameCaseInsensitive,
  attachMeta,
)

export const initialState = {
  query: '',
  route: {pathname: '/'},
  items: normalizeBdd(bdd),
  sortProp: 'fixed-benefits',
  sortOrder: 'descending',
  benefitsViewMode: '%',
  currentCategories: {
    all: true,
    favorites: false,
    stocks: false,
    crafts: false,
    outdated: false,
  },
}

export default initialState
