import {div, span} from '@cycle/dom'

import dot from 'utils/dot'
import css from './searchable.css'

export function StatusBar ({M}) {
  return {
    DOM: view(M),
  }
}
export default StatusBar

function view(state$) {
  return state$.map(list =>
    div(dot(css.statusBar), [
      div('.left', [`${list.length} results`]),
      div('.right', [
        `${4} objects selected`,
        ' | ',
        `${'1M4'} -> ${'2M6'}`,
        ' | ',
        `↑${'1M2'} ↑${184}%`,
      ]),
    ])
  )
}
