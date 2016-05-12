import {Observable as O} from 'rx'
import view from './view'
import {toggleAll} from './actions'
import {L} from 'stanga'
import {identity, every} from 'ramda'

const availableCategories = {
  all: 'tous',
  leftSide: {
    favorites: 'favoris',
    stocks: 'en vente',
    crafts: 'en cours de craft',
  },
  rightSide: {
    outdated: 'à mettre à jour (3)',
  },
}

export const Categories = ({DOM, M}) => {
  const state$ = M.lens(L.augment({
    all: dict => mapObjKeys(identity, dict).every(identity),
  }))
  const intents = intent(DOM)
  const reflect = propName =>
    M.lens(propName).set(intents.getToggle(propName))

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

const mapObjKeys = (fn, obj) => Object.keys(obj).map(key => fn(obj[key], key))
