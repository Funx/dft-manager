import {Observable as O} from 'rx'
import {div, button, span} from '@cycle/dom'

import view from './view'
import css from './stockStatus.css'
import dot from 'utils/dot'

export function renderStockStatus (item) {
  return div(dot(css.stockStatus),
    {style: `background-color: hsl(${item.hue}, 44%, 50%);`},
    [
      arrowButton('.i-crafts', `🔨 ${item.crafts}`),
      arrowButton('.i-stocks', `💰 ${item.stocks}`),
      arrowButton('.i-sold', `📈 ${item.sold}`),
    ]
  )
}

function arrowButton (className, content) {
  return button(className + dot(css.hexagon), [
    div(dot(css.inner1), [
      span(dot(css.inner2), [
        span(content),
      ]),
    ]),
  ])
}
