import {L} from 'stanga'
import {Observable as O} from 'rx'
import {pipe, prop} from 'ramda'

import OptionsBar from 'components/OptionsBar'
import VirtualList from 'components/VirtualList'

import {fromMapToArray, mergeMaps} from 'utils/iterable'

import {filterFn} from './filterFn'
import {sortFn} from './sortFn'
import {calcCosts} from './calcCosts'
import {view} from './view'

export const Dashboard = ({DOM, M, Screen}) => {
  const optionsBar = OptionsBar({
    DOM,
    M: M.lens(L.compose(
      L.augment({
        outdated: x => x.items.filter(prop('outdated')).length
      }),
      L.props(
        'sortOptions',
        'filters',
        'outdated',
      )
    )),
  })

  const virtualListM = M.lens(L.props('db', 'items', 'vList'))
    .lens(L.lens(
      x => x,
      ({db, items, vList}, model) => ({
        ...model,
        vList,
        db: mergeMaps(model.db, db),
      })
    ))
  const collection = VirtualList({
    DOM, Screen,
    M: virtualListM,
    viewParam$: M.lens('display'),
  })

  const searchResults$ = M
    .lens(L.props(
      'db',
      'filters',
      'sortOptions',
    ))
    .map(({db, filters = {}, sortOptions = {}}) =>
      pipe(
        calcCosts,
        fromMapToArray,
        filterFn(filters),
        sortFn(sortOptions),
      )(db)
    )

  const mod$ = M.lens('items').set(searchResults$)

  return {
    DOM: view(virtualListM.lens('items'), optionsBar, collection),
    M: O.merge(optionsBar.M, collection.M, mod$),
  }
}
export default Dashboard
