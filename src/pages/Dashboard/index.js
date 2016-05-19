import {L} from 'stanga'
import {Observable as O} from 'rx'
import {uniqBy, prop, pipe} from 'ramda'

import OptionsBar from 'components/OptionsBar'
import VirtualList from 'components/VirtualList'

import {filterFn} from './filterFn'
import {sortFn} from './sortFn'
import {view} from './view'

export const Dashboard = ({DOM, M, Screen}) => {
  const searchResults$ = M
    .lens(L.props(
      'items',
      'filters',
      'sortOptions',
      'vList'
    ))
    .lens(L.lens(
        ({items = [], filters = {}, sortOptions = {}, vList = {}}) => ({
          vList,
          items: pipe(
              filterFn(filters),
              sortFn(sortOptions),
            )(items),
        }),
        (obj, model) => ({
          ...model,
          ...obj,
          items: uniqBy(prop('id'), model.items.concat(obj.items)),
        })
    ))

  const optionsBar = OptionsBar({
    DOM,
    M: M.lens(L.props(
      'sortOptions',
      'filters',
    )),
  })

  const collection = VirtualList({
    DOM, Screen,
    M: searchResults$,
    viewParam$: M.lens('display').lens('benefits'),
  })

  return {
    DOM: view(searchResults$.lens('items'), optionsBar, collection),
    M: O.merge(optionsBar.M, collection.M),
  }
}
export default Dashboard
