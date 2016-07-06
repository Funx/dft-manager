import {L} from 'stanga'
import {Observable as O} from 'rx'
import {model} from './model'
import {intents} from './intents'
import {view} from './view'
import liftComponentAsList from 'utils/liftComponentAsList'
import {Card} from 'components/Card'

export function VirtualList (sources_) {
  const {M, Screen} = sources_

  const visibleItemsLens = L.compose(
    L.props('items', 'vList'),
    L.lens(
      ({items, vList}) => items
        .slice(...(vList.visibleRange || [0, 1]))
        .map(x => ({...x, offsetTop: vList.paddingTop})),
      (items, model) => (model) // readOnly
    )
  )
  const visibleItems$ = M.lens(visibleItemsLens)

  const cards = liftComponentAsList(Card, visibleItems$, sources_)
  const viewM = M.lens('vList')
    .lens(L.props('height', 'paddingTop'))
  const vtree$ = view(cards.DOM, viewM)

  const mod$ = model(M.lens(L.props('items', 'vList')), intents({Screen}))

  return {
    M: O.merge(cards.M, mod$),
    DOM: vtree$,
  }
}
export default VirtualList
