import {ul, li} from '@cycle/dom'

import {Card} from 'components/Card'
import css from './collection.css'
import dot from 'utils/dot'
import FLIP from 'utils/FLIP'
import liftComponentAsList from 'utils/liftComponentAsList'

export function Collection(responses) {
  const cards = liftComponentAsList(Card, responses.M, responses)

  return {
    M: cards.M,
    DOM: wrap(cards.DOM),
  }
}
export default Collection

function wrap(cards$) {
  return cards$
    .map(cards => cards.map(card =>
      li(dot(css.children),
        {key: card.key},
        card
      )
    ))
    .let(FLIP)
    .map(cards => ul(dot(css.collection), cards),
  )
}
