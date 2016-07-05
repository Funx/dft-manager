import {Observable as O} from 'rx'
import {concat, sortBy, prop, filter} from 'ramda'
import {Map} from 'immutable'
import {reducer} from './reducer'

export function stateMachine (actions$s, initialState$) {
  const transactions$ = O.merge(...actions$s)
    .startWith([])
    .scan(concat)
    .map(sortBy(prop('timestamp')))
    .map(metaReducers)
    .map(sortBy(prop('timestamp')))
    .map(filter(x => !x.canceled))

  const state$ = O.combineLatest(
      transactions$,
      initialState$,
      (transactions, db) => ({transactions, db}))
    .map(reducers)

  return state$
}

const metaReducer = (transactions, transaction) => {
  if (transaction.type == 'UNDO') {
    return transactions
      .update(transaction.target, (x) => ({...x, canceled: true}))
      .delete(transaction.id)
  }
  if (transaction.type == 'REDO') {
    return transactions
      .update(transaction.target, (x) => ({...x, canceled: false}))
      .delete(transaction.id)
  }
  return transactions
}
const metaReducers = (transactions) => transactions
  .reduce(metaReducer, Map(transactions.map(x => [x.id, x])))
  .toArray()

const reducers = ({transactions, db}) => transactions.reduce(reducer, db)
