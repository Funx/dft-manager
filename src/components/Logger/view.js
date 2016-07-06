import {div, ul, li, textarea, button, small, span} from '@cycle/dom'

import css from './logger.css'
import dot from 'utils/dot'
import {k} from 'utils/currency'
import {groupSimilarActions} from './parser'

export function view (M) {
  return M.map(({draft, logs}) =>
    div(dot(css.logger), [
      ul(dot(css.logs), [
        ...groupSimilarActions(logs).map(renderLog),
      ]),
      textarea('.m-logs' + dot(css.input),
        {attrs: {placeholder: '>_', required: 'true', value: draft}}),
      button('.i-submitLogs' + dot(css.submit), {attrs: {type: 'button'}}, [
        '>',
      ]),
    ])
  )
}

function renderLog (log) {
  const sigle = `[${log.type.charAt(0) + log.type.charAt(1)}]`
  const unitPrice = `${k(log.price / log.quantity)}/u`
  const priceInfos = (log.price)
    ? [` ${k(log.price)}`, small(` (${unitPrice})`)]
    : ['']

  return li(dot(css.log), [
    span(dot(css.icon), [sigle]),
    `${log.quantity} × ${log.name}`,
    ...priceInfos,
  ])
}
