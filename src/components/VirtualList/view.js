import {Observable as O} from 'rx'
import {div, ul, li} from '@cycle/dom'

import css from './collection.css'
import dot from 'utils/dot'
export function view (cards$, M) {
  // cards$.subscribe(x => console.log(x))
  return O.combineLatest(
    cards$,
    M,
    (cards, {height, paddingTop}) =>
      div('.virtualListContainer',
        {attrs: {style: `height: ${height}px;`}},
        [
          ul(dot(css.collection),
            {attrs: {style: `transform: translateY(${paddingTop}px);`}},
            cards.map(card => li('.card' + dot(css.children),
              {key: card.data.key},
              [card],
            )),
          ),
        ]
      )
  )
}
