import isolate from '@cycle/isolate'
import {flatCombine, flatMerge} from 'stanga'
import {Observable as O} from 'rx'

export function liftComponentAsList (Component, M, responses) {

  const list$ = M.liftListById((id, item$) => {
    const isolatedCard = isolate(Component, `item-${id}`)
    return isolatedCard({...responses, M: item$})
  })

  // flatCombine
  const DOM = list$
    .map(x => x.map(x => x.DOM))
    .map(x => O.combineLatest(...x, (...y) => y))
    .switch()

  return {
    DOM: DOM,
    // DOM: flatCombine(list$, 'DOM').DOM,
    // DOM: flatCombine(list$.do(() => console.time('flatCombine')), 'DOM').DOM
    //   .do(() => console.timeEnd('flatCombine')),
    M: flatMerge(list$.do(() => console.time('flatMerge')), 'M').M
      .do(() => console.timeEnd('flatMerge')),
  }
}
export default liftComponentAsList
