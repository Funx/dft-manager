import {Map} from 'immutable'

export const initialState = {
  route: {pathname: '/'},
  db: new Map([['a', {}]]),
  items: [],
  sortOptions: {
    property: 'benefits',
    ascending: false,
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
    logs: [{"type":"BUY","quantity":11,"price":868500,"target":"oeil-saltik"},{"type":"SELL","price":100000,"quantity":10,"target":"essence-royalmouth"},{"type":"SELL","price":299000,"quantity":20,"target":"essence-royalmouth"},{"type":"CRAFT","quantity":2,"target":"paralyseur-mineur"},{"type":"CRAFT","quantity":1,"target":"solide-mineur"},{"type":"CRAFT","quantity":1,"target":"paralyseur-mineur"}],
  },
  latestActions: [],
}

export default initialState
