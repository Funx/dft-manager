import {Observable as O} from 'rx'
import view from './view'
import {toggleAll, toggleProp} from './actions'
import {identity, every} from 'ramda'

const availableCategories = {
  all: 'tous',
  leftSide: {
    favorites: 'favoris',
    crafts: 'en cours de craft',
    stocks: 'en vente',
  },
  rightSide: {
    outdated: 'à mettre à jour (3)',
  },
}

export const Categories = ({DOM, M}) => {
  const state$ = M
  const intents = intent(DOM)
  const reflect = propName =>
    M.mod(intents.getToggle(propName).map(toggleProp(propName)))

  const mod$ = O.merge(
    M.mod(intents.getToggle('all').map(toggleAll)),
    reflect('favorites'),
    reflect('stocks'),
    reflect('crafts'),
    reflect('outdated'),
  )

  return {
    DOM: view(availableCategories)(state$),
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
