import {Observable as O} from 'rx'
import {L} from 'stanga'

import {intents} from './intents'
import {view} from './view'
import {appendLogs, updateDB} from './actions'
import {parseLogs} from './parser'

export function Logger ({DOM, M}) {
  const intent = intents({DOM})
  const gameEvents$ = intent.submit$
    .map(parseLogs)

  const updates$ = M.lens('logs')
    .distinctUntilChanged()
    .combineLatest(
        M.lens('db').skip(1).first(),
        (logs, db) => ({logs, db})
      )
      .do(x => console.log(x))

  const mod$ = O.merge(
      M.lens('draft').set(intent.draft$),
      M.lens('logs').mod(gameEvents$.map(appendLogs)),
      M.lens('db').mod(updates$.map(updateDB)),
    )
  return {
    DOM: view(M.lens(L.props('draft', 'logs'))),
    M: mod$,
  }
}
export default Logger
