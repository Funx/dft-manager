import {Observable as O} from 'rx'
import {div} from '@cycle/dom'

import Navbar from 'components/Navbar'
import Dashboard from 'pages/Dashboard'

import './reset.css'
import layout from 'pages/layout.css'
import {dot} from 'utils/dot'

const EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000
// const EXPIRY_TIME = 1000
export const main = (responses) => {
  // responses.M.lens('db').subscribe(x => console.log([...x.values()]))
  const dashboard = Dashboard(responses)
  const navbar = Navbar(responses)
  const outdated$ = responses.M.lens('db')
    .flatMap(db => O.fromArray(
      [...db.values()].filter(x => !x.outdated)
    ))
    .flatMap(x => O.of(x)
      .delay((new Date(x.latestUpdate + EXPIRY_TIME)))
      .takeUntil(responses.M.lens('db').skip(1))
    )

  const mod$ = responses.M.lens('db').mod(
    outdated$.map(x => db =>
      db.update(x.id, x => ({...x, outdated: true}))
    )
  )

  return {
    DOM: view(navbar.DOM, dashboard.DOM),
    M: O.merge(dashboard.M, mod$),
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
