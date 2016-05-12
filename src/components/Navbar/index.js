import {a, div, span} from '@cycle/dom'
import {Observable as O} from 'rx'

import dot from 'utils/dot'
import css from './navbar.css'

export const Navbar = () => (
  {
    DOM: view(),
  }
)
export default Navbar



const view = () => O.of(
  div([
    div(dot(css.container), [
      a(dot(css.logo), [
        span('dft'),
        span('manager'),
      ]),
    ]),
  ])
)
