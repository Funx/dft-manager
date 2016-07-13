import {Observable as O} from 'rx'
import {prop} from 'ramda'
import {L} from 'stanga'
import isolate from '@cycle/isolate'

import VirtualList from 'components/VirtualList'
import OptionsBar from 'components/OptionsBar'
import Logger from 'components/Logger'
import Categories from 'components/Categories'

import {view} from './view'

export const Dashboard = ({DOM, M, Screen}) => {
  const optionsBar = OptionsBar({DOM, M: M.lens(optionsBarLens)})
  const logger = Logger({DOM, M: M.lens(loggerLens)})
  const collection = VirtualList({
    DOM, Screen,
    Window: Object.assign(Object.create(DOM), {isolateSource: x => x}),
    M: M.lens(virtualListLens),
    viewParam$: M.lens('display'),
    updates$: M.lens('latestActions'),
  })
  const categories = isolate(Categories)
    ({DOM, M: M.lens(currentCategoriesLens)})

  const editing$ = collection.sink$
    .pluck('editing')
    .debounce(50)
  const mod$ = M.lens('display').lens('editing').set(editing$)

  return {
    DOM: view(
        M.lens('items'),
        optionsBar.DOM,
        collection.DOM,
        logger.DOM,
        categories.DOM,
      ),
    M: O.merge(optionsBar.M, collection.M, logger.M, categories.M, mod$),
  }
}
export default Dashboard

const currentCategoriesLens = L.compose(
  L.augment({
    outdated: x => x.items.filter(prop('outdated')).length,
  }),
  L.pick({
    outdated: 'outdated',
    currentCategories: L.compose('filters', 'currentCategories'),
  }),
)
const virtualListLens = L.props('items', 'vList')
const loggerLens = L.pick({
  db: L.prop('db'),
  logs: L.compose('logger', 'logs'),
  latestActions: L.prop('latestActions'),
  draft: L.compose('logger', 'draft'),
})
const optionsBarLens = L.props(
    'sortOptions',
    'filters',
  )
