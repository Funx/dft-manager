import {Observable as O} from 'rx'
import view from './view'
import {toggleAll, toggleProp} from './actions'

export const Categories = ({DOM, M}) => {
  const intents = intent(DOM)
  const reflect = propName => M.lens('currentCategories').mod(
    intents.getToggle(propName).map(toggleProp(propName))
  )

  const mod$ = O.merge(
    M.lens('currentCategories').mod(intents.getToggle('all').map(toggleAll)),
    reflect('favorites'),
    reflect('stocks'),
    reflect('crafts'),
    reflect('outdated'),
  )

  return {
    DOM: view(M.distinctUntilChanged()),
    M: mod$,
  }
}

export default Categories

const intent = DOM => {
  return {
    getToggle: (propName) => DOM.select(`.m-${propName}`)
      .events('change')
      .pluck('target', 'checked'),
  }
}
