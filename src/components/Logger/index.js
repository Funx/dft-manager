import {Observable as O} from 'rx'
import {div, ul, li, textarea} from '@cycle/dom'

import css from './logger.css'
import dot from 'utils/dot'

export function Logger ({}) {
  return {
    DOM: O.of(
      div(dot(css.logger), [
        ul(dot(css.logs), [
          li(dot(css.log), ['Hellooo']),
          li(dot(css.log), ['From']),
          li(dot(css.log), ['the']),
          li(dot(css.log), ['other']),
          li(dot(css.log), ['siiiiiide']),
        ]),
        textarea(dot(css.input), {placeholder: '>_'}),
      ])
    ),
    M: O.empty(),
  }
}
export default Logger
