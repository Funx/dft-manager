import {L} from 'stanga'
import {Observable as O} from 'rx'
import {identity, pipe} from 'ramda'

import OptionsBar from 'components/OptionsBar'
import Collection from 'components/Collection'

import {filterFn} from './filterFn'
import {view} from './view'

export const Dashboard = ({DOM, M}) => {
  const searchResults$ = M
    .lens(L.props('items', 'query', 'currentCategories'))
    .lens(L.lens(
        ({items, query, currentCategories}) =>
          pipe(
            filterFn({query, currentCategories}),
            // map(merge(__, {benefitsViewMode})),
          )(items),
        (items, model) => ({...model, items})
    ))

  const optionsBar = OptionsBar({DOM, M})

  const limitedSearchResults$ = searchResults$.lens(
    L.lens(xs => xs.slice(0, 20), identity))
  const collection = Collection({
    DOM,
    M: limitedSearchResults$,
    viewParam$: M.lens('benefitsViewMode'),
  })

  return {
    DOM: view(searchResults$, optionsBar, collection),
    M: O.merge(optionsBar.M, collection.M),
  }
}
export default Dashboard
