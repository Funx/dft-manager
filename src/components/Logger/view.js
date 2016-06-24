import {div, ul, li, textarea, button} from '@cycle/dom'
import {Observable as O} from 'rx'

import css from './logger.css'
import dot from 'utils/dot'

export function view (M) {
  return M.map(({draft, logs}) =>
    div(dot(css.logger), [
      ul(dot(css.logs), [
        logs.map(log => li(dot(css.log), [log])),
      ]),
      textarea('.m-logs' + dot(css.input), {placeholder: '>_', required: 'true', value: draft}),
      button('.i-submitLogs' + dot(css.submit), {type: 'button'}, '>'),
    ])
  )
}
