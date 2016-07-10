import {div, ul, li, textarea, button, small, span} from '@cycle/dom'

import iconFavorites from 'icons/icon_eye.svg'
import iconCrafts from 'icons/icon_hammer.svg'
import iconStocks from 'icons/icon_inventory.svg'
import {groupSimilarActions} from './parser'
import {k} from 'utils/currency'
import css from './logger.css'
import dot from 'utils/dot'


export function view (M) {
  return M.map(({draft, logs, db}) => {
    return div(dot(css.logger), [
      ul(dot(css.logs), [
        ...groupSimilarActions(logs).map(makeLogRenderer(db)),
      ]),
      textarea('.m-logs' + dot(css.input),
        {attrs: {placeholder: '>_', required: 'true'}, props: {value: draft}}),
      button('.i-submitLogs' + dot(css.submit), {attrs: {type: 'button'}}, [
        '>',
      ]),
    ])
  })
}

function makeLogRenderer (db) {
  return (log) => {
    const target = db.get(log.target) || {}
    const sigle = getSigle(log.type)
    const unitPrice = `${k(log.price / log.quantity)}/u`
    const priceInfos = (log.price)
      ? [` ${k(log.price)}`, small(` (${unitPrice})`)]
      : ['']
    const color = `hsl(${target.hue}, 75%, 60%)`
    const attributes = {style: {'background-color': color}}

    return li(dot(css.log), [
      span(dot(css.icon), attributes, [
        sigle,
        (log.quantity > 1)
          ? span(dot(css.quantity), [log.quantity])
          : '',
      ]),
      span([
        `${target.name}`,
        ...priceInfos,
      ]),
    ])
  }
}

function getSigle (type) {
  switch (type) {
    case 'TOGGLE_FAVORITES': return span({props: {innerHTML: iconFavorites}})
    case 'CRAFT': return span({props: {innerHTML: iconCrafts}})
    case 'SELL': return span({props: {innerHTML: iconStocks}})
    default: return `${type.charAt(0) + type.charAt(1)}`
  }
}
