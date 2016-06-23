import {Observable as O} from 'rx'
import {div} from '@cycle/dom'

import css from './logger.css'
import dot from 'utils/dot'

export function Logger ({}) {
  return {
    DOM: O.of(div(dot(css.logger), ['Hellooo'])),
    M: O.empty(),
  }
}
export default Logger
