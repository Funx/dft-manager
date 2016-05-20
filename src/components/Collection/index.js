import {ul, li} from '@cycle/dom'

import {Card} from 'components/Card'
import css from './collection.css'
import dot from 'utils/dot'
import FLIP from 'utils/FLIP'
import liftComponentAsList from 'utils/liftComponentAsList'

export function Collection(sources) {
  const cards = liftComponentAsList(Card, sources.M, sources)
  return {
    M: cards.M,
    DOM: cards.DOM.let(wrap),
  }
}
export default Collection

function wrap(cards$) {
  return cards$
    .map(cards => cards.map(card =>
      li(dot(css.children),
        {key: card.key},
        card,
      )
    ))
    // .let(FLIP)
    .map(cards => ul(dot(css.collection), cards))
}
