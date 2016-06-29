import {Observable as O} from 'rx'
import {div} from '@cycle/dom'

import Dashboard from 'pages/Dashboard'

import './reset.css'
import layout from 'pages/layout.css'
import {dot} from 'utils/dot'
import {normalizeDB} from './attachMetadata'

const EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000
export const main = (responses) => {
  const {M, HTTP} = responses
  const db$ = HTTP
    .switch()
    .pluck('body')
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

  const request$ = O.merge(
    O.of({
      url: '/db',
      category: 'db',
      method: 'GET',
    }),
    M.lens('db').debounce(1000).map(db => ({
      url: '/db',
      method: 'POST',
      // send: db.toArray(),
    })).do(x => console.log(x)),
  )


  return {
    DOM: view(dashboard.DOM),
    M: O.merge(dashboard.M, mod$),
    HTTP: request$,
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
