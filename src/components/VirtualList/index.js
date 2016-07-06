import {Observable as O} from 'rx'
import {model} from './model'
import {intent} from './intent'
import {view} from './view'
import liftComponentAsList from 'utils/liftComponentAsList'
import {Card} from 'components/Card'

export function VirtualList (sources_) {
  const {M, Screen} = sources_
  const intents = intent({Screen})
  const vList$ = model(M.lens('items'), intents)

  const visibleItems$ = O.combineLatest(
      M.lens('items'), vList$.pluck('visibleRange'),
      (items, visibleRange) => items
        .slice(...(visibleRange || [0, 1])))

  const cards = liftComponentAsList(Card, visibleItems$, sources_)
  const vtree$ = view(cards.DOM, vList$)
    .debounce(20)

  return {
    M: O.merge(cards.M),
    DOM: vtree$,
  }
}
export default VirtualList
