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

  const visibleRange$ = vList$
    .pluck('visibleRange')
    .windowWithCount(2)
    .selectMany(x => x.toArray())
    .flatMapLatest(([prev, next]) => {
      if (next[1] > prev[1]) {
        return O.interval(34)
          .startWith(prev[1])
          .scan((acc) => acc + 1)
          .filter(x => x <= next[1])
          .map(x => [next[0], x])
      } else {
        return O.interval(34)
          .startWith(prev[1])
          .scan((acc) => acc - 1)
          .filter(x => x >= next[1])
          .map(x => [next[0], x])
      }
    })


  const visibleItems$ = O.combineLatest(
      M.lens('items'), visibleRange$,
      (items, visibleRange) => items
        .slice(...(/*visibleRange || */[0, 2]))
    )

  const cards = liftComponentAsList(Card, visibleItems$, sources_)
  const vtree$ = view(cards.DOM, vList$)
    .sample(cards.DOM.delay(5))

  return {
    M: O.merge(cards.M),
    DOM: vtree$,
  }
}
export default VirtualList
