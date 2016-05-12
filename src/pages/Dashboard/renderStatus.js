import {div} from '@cycle/dom'
import dot from 'utils/dot'
import css from './searchable.css'

export const renderStatus = (list) =>
  div(dot(css.statusBar), [
    div('.left', []),
    div('.right', [
      `${list.length} results`,
      ' | ',
      `${'1M4'} -> ${'2M6'}`,
      ' | ',
      `↑${'1M2'} ↑${184}%`,
    ]),
  ])

export default renderStatus
