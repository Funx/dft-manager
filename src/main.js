import {Observable as O} from 'rx'
import {div} from '@cycle/dom'

import Navbar from 'components/Navbar'
import Dashboard from 'pages/Dashboard'

import './reset.css'
import layout from 'pages/layout.css'
import {dot} from './utils/dot'

export const main = (responses) => {
  responses.M.subscribe(x => console.log(x))

  const dashboard = Dashboard(responses)
  const navbar = Navbar(responses)

  return {
    DOM: view(navbar.DOM, dashboard.DOM),
    M: O.merge(dashboard.M),
  }
}

export default main


const view = (navbar, dashboard) => O.combineLatest(
  navbar, dashboard,
  (navbar, dashboard) =>
    div(dot(layout.layout), [
      div(dot(layout.shrink), navbar),
      div(dot(layout.grow), dashboard),
    ])
)
