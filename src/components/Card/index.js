import {div, small} from '@cycle/dom'

import css from './card.css'
import dot from 'utils/dot'

export const Card = ({M}) => {
  return {
    DOM: M.map(card =>
      div(dot(css.container), {dataVisible: card.visible, key: card.id},
        div(dot(css.innerWrapper),
          [card.name, small([' - ', card.type])]
        )
      )
    ),
  }
}
