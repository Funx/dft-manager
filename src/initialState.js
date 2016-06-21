import {prop, pipe, filter} from 'ramda'
import db from './bdd'
import {attachMeta} from './attachMetadata'
import {Map} from 'immutable'

const normalizeDB = pipe(
  filter(prop('name')),
  attachMeta,
  x => new Map(x.map(y => [y.id, y])),
)

export const initialState = {
  route: {pathname: '/'},
  db: normalizeDB(db),
  items: [],
  sortOptions: {
    property: 'benefits',
    order: 'descending',
  },
  filters: {
    query: '',
    currentCategories: {
      all: true,
      favorites: false,
      crafts: false,
      stocks: false,
      outdated: false,
    },
  },
  display: {
    benefits: '%',
  },
  vList: {},
}

export default initialState
