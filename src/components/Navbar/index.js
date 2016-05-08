import {a, div, span} from '@cycle/dom'

import dot from 'utils/dot'
import navigation from './navigation'

import css from './navbar.css'

export const Navbar = ({M}) => {
  return {
    DOM: view(M),
  }
}
export default Navbar

function view(state$) {
  return state$.map(({route, items}) =>
    div([
      div(dot(css.container), [
        a(dot(css.logo), [
          span('dft'),
          span('manager'),
        ]),
        navigation({route, items}),
      ]),
    ])
  )
}
