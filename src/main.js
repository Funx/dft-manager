import {Observable as O} from 'rx'
import {div} from '@cycle/dom'

import Dashboard from 'pages/Dashboard'

import './reset.css'
import layout from 'pages/layout.css'
import {dot} from 'utils/dot'
import {normalizeDB} from './attachMetadata'

const EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000
export const main = (responses) => {
  const {M, WS} = responses

  const db$ = WS.select('welcome')
    .do(x => console.log(x))
    .map(normalizeDB)


  const dashboard = Dashboard(responses)
  const outdated$ = M.lens('db')
    .flatMap(db => O.fromArray(
      [...db.values()].filter(x => !x.outdated)
    ))
    .flatMap(x => O.of(x)
      .delay((new Date(x.latestUpdate + EXPIRY_TIME)))
      .takeUntil(M.lens('db').skip(1))
    )

  const mod$ = O.merge(
    M.lens('db').set(db$),
    M.lens('db').mod(
      outdated$.map(x => db =>
        db.update(x.id, x => ({...x, outdated: true}))
      )
    )
  )

  const transaction$ = M.lens('db')
    .debounce(1000)
    .map(db => ({
      name: 'transaction',
      message: db,
    }))


  return {
    DOM: view(dashboard.DOM),
    M: O.merge(dashboard.M, mod$),
    WS: transaction$,
  }
}

export default main

const view = (dashboard) => O.combineLatest(
  dashboard,
  (dashboard) =>
    div(dot(layout.layout), [
      div(dot(layout.content), [dashboard]),
    ])
)
