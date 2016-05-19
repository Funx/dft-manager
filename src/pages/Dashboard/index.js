import {L} from 'stanga'
import {Observable as O} from 'rx'
import {uniqBy, prop, pipe} from 'ramda'

import OptionsBar from 'components/OptionsBar'
import VirtualList from 'components/VirtualList'

import {filterFn} from './filterFn'
import {view} from './view'

export const Dashboard = ({DOM, M, Screen}) => {
  const searchResults$ = M
    .lens(L.props('items', 'query', 'currentCategories', 'visibleRange'))
    .lens(L.lens(
        ({items, query, currentCategories, visibleRange}) => ({
          visibleRange,
          items: pipe(
              filterFn({query, currentCategories}),
              // sortFn(),
              // map(merge(__, {benefitsViewMode})),
            )(items),
        }),
        (obj, model) => ({
          ...model,
          ...obj,
          items: uniqBy(prop('id'), model.items.concat(obj.items)),
        })
    ))

  const optionsBar = OptionsBar({DOM, M})

  const collection = VirtualList({
    DOM, Screen,
    M: searchResults$,
    viewParam$: M.lens('benefitsViewMode'),
  })

  return {
    DOM: view(searchResults$.lens('items'), optionsBar, collection),
    M: O.merge(optionsBar.M, collection.M),
  }
}
export default Dashboard
