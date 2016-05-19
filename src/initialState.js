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
  route: {pathname: '/'},
  items: normalizeBdd(bdd),
  sortOptions: {
    property: 'benefits',
    order: 'descending',
  },
  filters: {
    query: '',
    currentCategories: {
      all: true,
      favorites: false,
      stocks: false,
      crafts: false,
      outdated: false,
    },
  },
  display: {
    benefits: '%',
  },
}

export default initialState
