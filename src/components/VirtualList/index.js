import {ul, li} from '@cycle/dom'
import {L} from 'stanga'
import {Observable as O} from 'rx'

import {Collection} from 'components/collection'

const EXTRA_BLEED = 3
const DEBOUNCE = 50
export function VirtualList (sources_) {
  const {M, Screen} = sources_

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
  ).startWith(21)

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
  rowLength$.subscribe(x => console.log('rowLength', x))
  height$.subscribe(x => console.log('height', x))
  // const visibleCount$ = O.of(9)
  const visibleRange$ = O.combineLatest(
    offset$, visibleCount$,
    (offset, visibleCount) => [offset, offset + visibleCount]
  )

  const mod$ = M.lens('visibleRange').set(visibleRange$)
  const paddingTop$ = O.combineLatest(
    offset$, rowLength$, itemHeight$,
    (offset, rowLength, itemHeight) => offset / rowLength * itemHeight
  ).distinctUntilChanged()

  const visibleItems$ = M.lens(L.lens(
    ({items, visibleRange = [0, 21]}) => items.slice(...visibleRange),
    (items, model) => ({...model, items})
  ))

  const sources = {...sources_, M: visibleItems$}
  const collection = Collection(sources)
  const vtree$ = collection.DOM
    .let(transformVtree(height$, paddingTop$))
    .debounce(DEBOUNCE)

  return {
    M: O.merge(collection.M, mod$),
    DOM: vtree$,
  }
}
export default VirtualList

function transformVtree (height$, paddingTop$) {
  return vtree$ => O.combineLatest(
    vtree$, height$, paddingTop$,
    (ul, height, paddingTop) => {
      const style = {
        'height': `${height}px`,
        // 'padding-top': `${paddingTop}px`,
      }
      const children = ul.children.map(li => Object.assign(li, {
        properties: {
          ...li.properties,
          style: {
            ...li.properties.style,
            transform: `translateY(${paddingTop}px)`,
          },
        },
      }))
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
