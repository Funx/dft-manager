import {Observable as O} from 'rx'
import {concat, sortBy, prop, filter, curry} from 'ramda'
import {toMap} from 'utils/iterable'
import {dbReducer} from './dbReducer'
import {metaReducer} from './metaReducer'
import {calcCosts} from './calcCosts'

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

  return state$
}

const metaRedux = actions => redux(metaReducer, toMap(actions), actions)

const sortByTimestamp = sortBy(prop('timestamp'))
const redux = curry((reducer, db, actions) => {
  return actions.reduce(reducer, db)
})
