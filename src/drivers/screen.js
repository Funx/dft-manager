import {Observable as O} from 'rx'

export function makeScreenDriver () {
  const resize$ = O.fromEvent(window, 'resize')
    .startWith({})

  return () => ({
    height: () => resize$.map(() => window.innerHeight),
    width: () => resize$.map(() => window.innerWidth),
    events: (eventName, selector) => {
      const toElement = selector
        ? () => document.querySelectorAll(selector)
        : x => x

      return O.fromEvent(window, eventName)
        .startWith({})
        .merge(O.interval(100).take(5).map({}))
        .map(toElement)
        .filter(x => !selector || x.length)
        .shareReplay(1)
    },
  })
}

export default makeScreenDriver
