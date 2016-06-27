import {prop, pipe, filter} from 'ramda'
import db from './bdd'
import {attachMeta} from './attachMetadata'
import {Map} from 'immutable'
import {calcCosts} from 'pages/Dashboard/calcCosts'

const normalizeDB = pipe(
  filter(prop('name')),
  attachMeta,
  x => new Map(x.map(y => [y.id, y])),
  calcCosts,
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
  vList: {
    height: 1000,
    paddingTop: 0,
  },
  logger: {
    draft: '',
    logs: [],
  },
}

export default initialState
