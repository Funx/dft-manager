import {concat, sortBy, prop, filter, curry} from 'ramda'
import {Observable as O} from 'rx'

import {metaReducer} from './metaReducer'
import {dbReducer} from './dbReducer'
import {calcCosts} from './calcCosts'
import {EXPIRY_TIME} from '../params'
import {toMap} from 'utils/iterable'

export function stateMachine (actions$s, initialState$) {
  const transactions$ = O.merge(...actions$s)
    .startWith([])
    .scan(concat)
    .map(sortByTimestamp)
    .map(metaRedux)
    .map(x => x.toArray())
    .map(filter(x => !x.canceled))
    .map(sortByTimestamp)

  const state$ = O.combineLatest(
      transactions$,
      initialState$,
      (transactions, db) => ({transactions, db}))
    .map(({db, transactions}) => calcCosts(redux(dbReducer, db, transactions)))
    .timestamp()
    .map(({value, timestamp}) => outdate(timestamp, value))
  return state$
}

function outdate (now, db) {
  return db.map(x => ({
    ...x,
    outdated: now > x.latestUpdate + EXPIRY_TIME,
  }))
}

const metaRedux = actions => redux(metaReducer, toMap(actions), actions)

const sortByTimestamp = sortBy(prop('timestamp'))
const redux = curry((reducer, db, actions) => {
  return actions.reduce(reducer, db)
})
