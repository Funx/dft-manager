import {div, button, span, svg} from '@cycle/dom'

import css from './stockStatus.css'
import dot from 'utils/dot'
import iconCrafts from 'icons/icon_hammer.svg'
import iconStocks from 'icons/icon_inventory.svg'
const svgIcon = svg => span({props: {innerHTML: svg}})

export function renderStockStatus (item) {
  const color = `hsl(${item.hue}, 44%, 50%)`
  return div(dot(css.stockStatus),
    {attrs: {style: `background: ${color};`}},
    [
      (item.recipe.length)
        ? arrowButton(`.i-crafts${item.crafts ? dot(css.isActive) : ''}`,
          span({attrs: {style: `color: ${color};`}}, [svgIcon(iconCrafts), ` ${item.crafts}`]))
        : '',
      arrowButton(`.i-stocks${item.stocks ? dot(css.isActive) : ''}`,
        span({attrs: {style: `color: ${color};`}}, [svgIcon(iconStocks), ` ${item.stocks}`])),
      arrowButton(`.i-sold`,
        span({attrs: {style: `color: ${color};`}}, [`${item.sold}`])),
    ],
  )
}

function arrowButton (className, content) {
  return button(className + dot(css.hexagon), [
    div(dot(css.inner1), [
      span(dot(css.inner2), [
        span(dot(css.content), [content]),
      ]),
    ]),
  ])
}
