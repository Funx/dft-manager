import {sortBy, compose, prop, toLower, either, pipe, filter, identity} from 'ramda'
import bdd from './bdd'

const sortByNameCaseInsensitive = sortBy(compose(prop('name')))
const normalizeBdd = pipe(
  filter(prop('name')),
  sortByNameCaseInsensitive,
)

export const initialState = {
  route: {pathname: '/'},
  items: normalizeBdd(bdd),
}

export default initialState
