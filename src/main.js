import {Observable as O} from 'rx'
import {pipe} from 'ramda'
import {L} from 'stanga'

import {stateMachine} from 'dataHandlers/stateMachine'
import {makeFilterer} from 'dataHandlers/makeFilterer'
import {makeSorter} from 'dataHandlers/makeSorter'
import Dashboard from 'pages/Dashboard'

import {toMap} from 'utils/iterable'
import './reset.css'

const EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000
export const main = (responses) => {
  const {M, WS} = responses
  const initialState$ = WS.select('welcome')
    .map(toMap)

  const transaction$ = M.lens('latestActions')
  const dbChange$ = stateMachine([transaction$], initialState$)

  const dashboard = Dashboard(responses)
  const outdated$ = M.lens('db')
    .flatMap(db => O.fromArray(
      [...db.values()].filter(x => !x.outdated)
    ))
    .flatMap(x => O.of(x)
      .delay((new Date(x.latestUpdate + EXPIRY_TIME)))
      .takeUntil(M.lens('db').skip(1))
    )

  const searchResults$ = M
    .lens(L.props(
      'db',
      'filters',
      'sortOptions',
    ))
    .distinctUntilChanged()
    .map(({db, filters = {}, sortOptions = {}}) =>
      pipe(
        x => x.toArray(),
        makeFilterer(filters),
        makeSorter(sortOptions),
      )(db)
    )
    .shareReplay(1)

  const mod$ = O.merge(
    M.lens('db').set(dbChange$),
    M.lens('db').mod(outdated$.map(
      x => db => db.update(x.id, x => ({...x, outdated: true}))
    )),
    M.lens('items').set(searchResults$)
  )


  const socket$ = M.lens('latestActions')
    .map(db => ({
      name: 'transaction',
      message: db,
    }))


  return {
    DOM: dashboard.DOM,
    M: O.merge(dashboard.M, mod$),
    WS: socket$,
  }
}

export default main
