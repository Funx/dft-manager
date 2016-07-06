import {div, button, span} from '@cycle/dom'

import css from './stockStatus.css'
import dot from 'utils/dot'
import iconCrafts from 'icons/icon_hammer.svg'
import iconStocks from 'icons/icon_inventory.svg'
const svgIcon = svg => span({props: {innerHTML: svg}})

export function renderStockStatus (item) {
  const color = `hsl(${item.hue}, 44%, 50%)`
  const attributes = {attrs: {style: `background: ${color};`}}
  const buttons = [
    {
      id: '.i-crafts',
      value: item.crafts,
      content: [svgIcon(iconCrafts), ` ${item.crafts}`],
    },
    {
      id: '.i-stocks',
      value: item.stocks,
      content: [svgIcon(iconStocks), ` ${item.stocks}`],
    },
    {
      id: '.i-sold',
      value: item.sold,
      content: [String(item.sold)],
    },
  ]

  const renderButton = ({id, content, value}) => {
    const activeClass = value ? dot(css.isActive) : ''
    const btnAttrs = {attrs: {tabIndex: item.editing ? '-1' : ''}}
    const spanAttrs = {attrs: {style: `color: ${color};`}}
    return arrowButton(id + activeClass, btnAttrs, [
      span(spanAttrs, content),
    ])
  }

  if (!item.recipe || !item.recipe.length) {
    var buttonsVtree$ = buttons.slice(1).map(renderButton)
  } else {
    var buttonsVtree$ = buttons.map(renderButton)
  }

  return div(dot(css.stockStatus), attributes, buttonsVtree$)
}

function arrowButton (className, attributes, content) {
  return button(className + dot(css.hexagon), attributes, [
    div(dot(css.inner1), [
      span(dot(css.inner2), [
        span(dot(css.content), content),
      ]),
    ]),
  ])
}
