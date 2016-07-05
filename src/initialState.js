import {Map} from 'immutable'

export const initialState = {
  route: {pathname: '/'},
  db: new Map([['a', {}]]),
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
  latestActions: [],
}

export default initialState
