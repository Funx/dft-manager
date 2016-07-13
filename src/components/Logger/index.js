import {Observable as O} from 'rx'
import {L} from 'stanga'

import {intents} from './intents'
import {view} from './view'
import {appendLogs} from './actions'
import {parseLogs} from './parser'

export function Logger ({DOM, M}) {
  const intent = intents({DOM})
  const mod$ = O.merge(
      M.lens('draft').set(intent.draft$),
      M.lens('logs').mod(M.lens('latestActions').map(appendLogs)),
      M.lens('latestActions').set(intent.submit$.map(parseLogs)),
    )
  return {
    DOM: view(M.lens(L.props('draft', 'logs', 'db')).distinctUntilChanged()),
    M: mod$,
  }
}
export default Logger
