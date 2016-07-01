import {Observable as O} from 'rx'
import {concat, orderBy, prop} from 'ramda'
import {Map} from 'immutable'

export function stateMachine (transaction$s, initialState$) {
  return O.merge(...transaction$s)
    // .startWith([])
    // .scan(concat)
    // .map(orderBy(prop('timestamp')))
    // .map(metaTransformation)
    // .combineLatest(initialState$, (transactions, db) => ({transactions, db}))
    // .map(transform)
}

const reducer = (db, transaction) => db
const transform = ({transactions, db}) => transactions.reduce(reducer, db)

const metaTransformation = (transactions) => transactions
  .reduce(meta, Map(transactions.map(x => [x.id, x])))
  .toArray()
  .filter(prop('canceled'))

const meta = (transactions, transaction) => {
  if (transaction.type == 'UNDO') {
    return transactions
      .set(transaction.target, 'canceled', false)
      .delete(transaction.id)
  }
  if (transaction.type == 'REDO') {
    return transactions
      .set(transaction.target, 'canceled', false)
      .delete(transaction.id)
  }
  return transactions
}
