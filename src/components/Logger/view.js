import {div, ul, li, textarea, button, small} from '@cycle/dom'
import {Observable as O} from 'rx'

import css from './logger.css'
import dot from 'utils/dot'
import {k} from 'utils/currency'

export function view (M) {
  return M.map(({draft, logs}) =>
    div(dot(css.logger), [
      ul(dot(css.logs), [
        logs.map(renderLog),
      ]),
      textarea('.m-logs' + dot(css.input), {placeholder: '>_', required: 'true', value: draft}),
      button('.i-submitLogs' + dot(css.submit), {type: 'button'}, '>'),
    ])
  )
}

function renderLog (log) {
  return li(dot(css.log), [
    span(dot(css.icon), `[${log.type.charAt(0) + log.type.charAt(1)}]`),
    `${log.quantity} × ${log.name}`,
    log.price ? ` ${k(log.price)}` : '',
    log.price ? small(` (${k(log.price / log.quantity)}/u)`) : '',
  ])
}
