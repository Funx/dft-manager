import {Observable as O} from 'rx'
import {div, span, button} from '@cycle/dom'

import Collection from 'components/Collection'

export function PaginatedCollection(limit, {DOM, M}) {
  const collection = Collection({DOM, M: M.lens('items')})
  const intents = intent({DOM})
  console.log(limit)
  M.subscribe(x => console.log(x))

  const mod$ = O.merge(
    M.lens('pagination').mod(intents.prev$.map(() => x => x - 1)),
    M.lens('pagination').mod(intents.next$.map(() => x => x + 1)),
    collection.M,
  )

  return {
    DOM: O.combineLatest(
      collection.DOM, M,
      (collection, {pagination}) =>
      div([
        div([
          button('.a-prev', ['prev']),
          span([pagination]),
          button('.a-next', ['next']),
        ]),
        div(collection),
      ])
    ),
    M: mod$,
  }
}
export default PaginatedCollection

function intent({DOM}) {
  return {
    prev$: DOM.select('.a-prev').events('click'),
    next$: DOM.select('.a-prev').events('click'),
  }
}
