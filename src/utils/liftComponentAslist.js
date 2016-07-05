import isolate from '@cycle/isolate'
import {flatCombine, flatMerge} from 'stanga'

// simple wrapper around stanga's liftListById to auto isolate Component
export function liftComponentAsList (Component, M, responses) {
  const list$ = M.liftListById((id, item$) => {
    const isolatedCard = isolate(Component, `item-${id}`)
    return isolatedCard({...responses, M: item$})
  })

  return {
    DOM: flatCombine(list$, 'DOM').DOM,
    M: flatMerge(list$, 'M').M,
  }
}
export default liftComponentAsList
