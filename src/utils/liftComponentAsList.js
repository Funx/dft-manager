import isolate from '@cycle/isolate'
import {flatCombine, flatMerge, liftListById} from 'stanga'

// simple wrapper around stanga's liftListById to auto isolate Component
export function liftComponentAsList (Component, M, responses) {
  const list$ = liftListById(M, (id, item$) => {
    const isolatedCard = isolate(Component, `item-${id}`)
    return isolatedCard({...responses, M: item$})
  })

  return {
    ...flatMerge(list$, 'M', 'sink$'),
    DOM: flatCombine(list$, 'DOM').DOM,
  }
}
export default liftComponentAsList
