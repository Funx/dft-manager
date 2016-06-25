import {Observable as O} from 'rx'
import {div} from '@cycle/dom'

import Navbar from 'components/Navbar'
import Dashboard from 'pages/Dashboard'

import './reset.css'
import layout from 'pages/layout.css'
import {dot} from 'utils/dot'

const LOG_LIFECYCLE = true
const LOG_BUBBLEUP = false
const LOG_BUBBLEDOWN = false

const EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000
export const main = (responses) => {
  responses.M.subscribe(() => {
    if (LOG_BUBBLEUP) console.timeEnd('BUBBLE UP (MOD -> UPDATE)')
    if (LOG_BUBBLEDOWN) console.time('BUBBLE DOWN (UPDATE -> DRAW)')
  })
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
    M: O.merge(dashboard.M, mod$)
      .do(() => {
        if (LOG_LIFECYCLE) console.time('== LIFECYCLE (MOD -> DRAW)')
        if (LOG_BUBBLEUP) console.time('BUBBLE UP (MOD -> UPDATE)')
      }),
  }
}

export default main

import {Hook} from 'utils/hook'
const view = (navbar, dashboard) => O.combineLatest(
  navbar, dashboard,
  (navbar, dashboard) =>
    div(dot(layout.layout), {'test': Hook(() => {
      if (LOG_BUBBLEDOWN) console.timeEnd('BUBBLE DOWN (UPDATE -> DRAW)')
      if (LOG_LIFECYCLE) console.timeEnd('== LIFECYCLE (MOD -> DRAW)')
    })}, [
      // div(dot(layout.header), navbar),
      div(dot(layout.content), dashboard),
    ])
)
