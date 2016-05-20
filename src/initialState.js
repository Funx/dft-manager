import {prop, pipe, filter} from 'ramda'
import db from './bdd'
import {attachMeta} from './attachMetadata'
import {fromArrayToMap} from 'utils/iterable'

const normalizeDB = pipe(
  filter(prop('name')),
  attachMeta,
  fromArrayToMap,
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
