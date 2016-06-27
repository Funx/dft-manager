import {L} from 'stanga'
import {Observable as O} from 'rx'
import {pipe, prop} from 'ramda'

import OptionsBar from 'components/OptionsBar'
import VirtualList from 'components/VirtualList'
import Logger from 'components/Logger'

import {monitorFn} from 'utils/debug'
import {filterFn} from './filterFn'
import {sortFn} from './sortFn'
import {calcCosts} from './calcCosts'
import {view} from './view'

export const Dashboard = ({DOM, M, Screen}) => {
  const optionsBar = OptionsBar({
    DOM,
    M: M.lens(L.compose(
      L.augment({
        outdated: x => x.items.filter(prop('outdated')).length,
      }),
      L.props(
        'sortOptions',
        'filters',
        'outdated',
      )
    )),
  })

  const virtualListM = M.lens(L.props('items', 'vList'))
  const collection = VirtualList({
    DOM, Screen,
    M: virtualListM,
    viewParam$: M.lens('display'),
    updates$: M.lens('logger').lens('logs'),
  })

  const loggerM = M.lens(L.pick({
    db: L.prop('db'),
    logs: L.compose('logger', 'logs'),
    draft: L.compose('logger', 'draft'),
  }))
  const logger = Logger({DOM, M: loggerM})

  const searchResults$ = M
    .lens(L.props(
      'db',
      'filters',
      'sortOptions',
    ))
    .distinctUntilChanged()
    .map(({db, filters = {}, sortOptions = {}}) =>
      pipe(
        // monitorFn('calcCosts', calcCosts),
        x => x.toArray(),
        filterFn(filters),
        sortFn(sortOptions),
      )(db)
    )
    .shareReplay(1)

  const mod$ = M.lens('items').set(searchResults$)

  return {
    DOM: view(M.lens('items'), optionsBar, collection, logger),
    M: O.merge(optionsBar.M, collection.M, logger.M, mod$),
  }
}
export default Dashboard
