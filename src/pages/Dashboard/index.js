import {L} from 'stanga'
import {Observable as O} from 'rx'

import OptionsBar from 'components/OptionsBar'
import Collection from 'components/Collection'

import {filterFn} from './filterFn'
import {view} from './view'

export const Dashboard = ({DOM, M}) => {
  const searchResults$ = M.lens(L.props('query', 'items'))
      .lens(L.lens(
        ({items, query}) => filterFn(query, items).slice(0, 199),
        (items, model) => ({...model, items})
    ))

  const optionsBar = OptionsBar({DOM, M})
  const collection = Collection({DOM, M: searchResults$})

  return {
    DOM: view(searchResults$, optionsBar, collection),
    M: O.merge(optionsBar.M, collection.M),
  }
}
export default Dashboard
