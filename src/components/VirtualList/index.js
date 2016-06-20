import {L} from 'stanga'
import {Observable as O} from 'rx'

import {Collection} from 'components/collection'
import {mergeArrayInMap} from 'utils/iterable'

const EXTRA_BLEED = 3 // the bigger the number, the bigger the impact in DOM perf on huge screens (it renders a lot more of elements)
export function VirtualList (sources_) {
  const {M, Screen} = sources_
  const vList$ = M.lens('vList')

  const scrollTop$ = Screen.events('scroll', 'body').map(x => x[0])
    .pluck('scrollTop')
    .startWith(0)
  const item$ = Screen.events('resize', '.virtualListContainer > li')
    .map(x => x[0])
  const itemWidth$ = item$.pluck('clientWidth')
    .filter(x => x)
    .startWith(300)
    .distinctUntilChanged()

  const itemHeight$ = item$.pluck('clientHeight')
    .filter(x => x)
    .startWith(300)
    .distinctUntilChanged()

  const container$ = Screen.events('resize', '.virtualListContainer')
    .map(x => x[0])
  const containerTop$ = container$.pluck('offsetTop')
    .startWith(0)
    .distinctUntilChanged()
  const containerWidth$ = container$.pluck('offsetWidth')
    .startWith(900)
    .distinctUntilChanged()
  const rowLength$ = O.combineLatest(
      containerWidth$, itemWidth$,
      (available, width) => Math.round(available / width)
    )


  const screenHeight$ = Screen.height()
  const visibleCount$ = O.combineLatest(
      screenHeight$, itemHeight$, rowLength$,
      (screenH, itemH, rowLength) =>
        (Math.round(screenH / itemH) + EXTRA_BLEED * 2) * rowLength
    )

  const offset$ = O.combineLatest(
    scrollTop$, containerTop$, itemHeight$, rowLength$,
    (scroll, containerTop, itemHeight, rowLength) =>
      Math.max(0,
        Math.round(((scroll - containerTop) / itemHeight) - EXTRA_BLEED) * rowLength)
  )


  const height$ = O.combineLatest(
      M, itemHeight$, rowLength$,
      ({items}, height, rowLength) =>
        Math.ceil(items.length / rowLength) * height,
    )
    .distinctUntilChanged()

  const paddingTop$ = O.combineLatest(
      offset$, rowLength$, itemHeight$,
      (offset, rowLength, itemHeight) => offset / rowLength * itemHeight
    )
    .distinctUntilChanged()

  const visibleRange$ = O.combineLatest(
      offset$, visibleCount$,
      (offset, visibleCount) => [offset, offset + visibleCount]
    )
    .distinctUntilChanged()

  const visibility$ = O.combineLatest(
      offset$, rowLength$, itemHeight$, visibleCount$,
      (offset, rowLength, itemHeight, visibleCount) => ({
        paddingTop: offset / rowLength * itemHeight,
        visibleRange: [offset, offset + visibleCount],
      })
    )
    .distinctUntilChanged()

  const visibleItems$ = M.lens(L.lens(
    ({items, vList}) => items
      .slice(...(vList.visibleRange || [0, 1]))
      .map(x => ({...x, offsetTop: vList.paddingTop})),
    (items, model) => ({
      ...model,
      db: mergeArrayInMap(model.db, items),
    })
  ))

  const sources = {...sources_, M: visibleItems$}
  // const sources = {...sources_}
  const collection = Collection(sources)
  const vtree$ = collection.DOM
    .let(transformVtree(vList$))
    // .debounce(THROTTLE)

  // const mod$ = O.merge(
  //   vList$.lens('visibleRange').set(visibleRange$),
  //   vList$.lens('paddingTop').set(paddingTop$),
  //   vList$.lens('height').set(height$),
  // )

  const mod$ = O.merge(
    vList$.lens('height').set(height$),
    vList$.mod(visibility$.map(x => y => ({...y, ...x})))
  )

  return {
    ...collection,
    M: O.merge(collection.M, mod$),
    DOM: vtree$,
  }
}
export default VirtualList

function transformVtree (vList$) {
  return vtree$ => O.combineLatest(
    vtree$, vList$,
    (ul, {height, paddingTop}) => {
      const style = {'height': `${height}px`}
      const children = ul.children
        // .map(li => Object.assign(li, {
        //   properties: {
        //     ...li.properties,
        //     style: {
        //       ...li.properties.style,
        //       transform: `translateY(${paddingTop}px)`,
        //     },
        //   },
        // }))
      const hasClassName = (ul.properties.className
        .indexOf('virtualListContainer') != -1)
      const className = `${ul.properties.className || ''} virtualListContainer`
      const properties = {
        ...ul.properties,
        className: hasClassName ? ul.properties.className : className,
        style: {...ul.properties.style, ...style},
      }
      return Object.assign(ul, {properties, children})
    })
}
