import {Observable as O} from 'rx'
import {L} from 'stanga'

import {intents} from './intents'
import {view} from './view'
import {appendLogs} from './actions'
import {parseLogs} from './parser'

export function Logger ({DOM, M}) {
  const intent = intents({DOM})
  const update$ = intent.submit$
    .map(parseLogs)
  const mod$ = O.merge(
      M.lens('draft').set(intent.draft$),
      M.lens('logs').mod(update$.map(appendLogs)),
      // M.lens('db').mod(intent.submit$.map(parseLog)),
    )
  return {
    DOM: view(M.lens(L.props('draft', 'logs'))),
    M: mod$,
  }
}
export default Logger
