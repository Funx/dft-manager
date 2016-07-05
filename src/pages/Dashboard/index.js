import {Observable as O} from 'rx'
import {prop} from 'ramda'
import {L} from 'stanga'

import VirtualList from 'components/VirtualList'
import OptionsBar from 'components/OptionsBar'
import Logger from 'components/Logger'

import {view} from './view'

export const Dashboard = ({DOM, M, Screen}) => {
  const optionsBar = OptionsBar({DOM, M: M.lens(optionsBarLens)})
  const logger = Logger({DOM, M: M.lens(loggerLens)})
  const collection = VirtualList({
    DOM, Screen,
    M: M.lens(virtualListLens),
    viewParam$: M.lens('display'),
    updates$: M.lens('latestActions'),
  })

  return {
    DOM: view(M.lens('items'), optionsBar, collection, logger),
    M: O.merge(optionsBar.M, collection.M, logger.M),
  }
}
export default Dashboard


const virtualListLens = L.props('items', 'vList')
const loggerLens = L.pick({
  db: L.prop('db'),
  logs: L.compose('logger', 'logs'),
  latestActions: L.prop('latestActions'),
  draft: L.compose('logger', 'draft'),
})
const optionsBarLens = L.compose(
  L.augment({
    outdated: x => x.items.filter(prop('outdated')).length,
  }),
  L.props(
    'sortOptions',
    'filters',
    'outdated',
  )
)
