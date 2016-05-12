import {div, small} from '@cycle/dom'

import css from './card.css'
import dot from 'utils/dot'

export const Card = ({M}) => {
  M.subscribe(x => console.log(x.color))
  return {
    DOM: M.map(card =>
      div(
        dot(css.container),
        {
          dataVisible: card.visible,
          key: card.id,
          style: `background-color: ${card.color}`,
        },
        div(dot(css.innerWrapper),
          [card.name, small([' - ', card.type])]
        )
      )
    ),
  }
}
