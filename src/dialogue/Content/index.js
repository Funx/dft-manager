import { Observable } from 'rx'
import { h } from '@cycle/dom'
import latestObj from 'rx-combine-latest-obj'
import switchPath from 'switch-path'
import routes from './routes'

const {
  div,
} = require(`hyperscript-helpers`)(h)

function createRouteValue(responses) {
  return function getRouteValue(location) {
    const { value } = switchPath(location.pathname, routes)
    return typeof value === `function`
      ? value(responses)
      : value
  }
}

const model = (responses) => {
  const childView$ = responses.History
    .map(createRouteValue(responses))

  const routeValue$ = childView$
    .flatMap(value => value.DOM || Observable.just(value))
  const routeTitle$ = childView$
    .flatMap(value => value.title$ || Observable.just(`Cycle-Starter`))

  return latestObj({
    routeValue$,
    routeTitle$,
  })
  .distinctUntilChanged()
}

const view = state$ => state$
  .pluck(`routeValue`)
  .startWith('loading')
  .map(x => div(x))
  .distinctUntilChanged()

export const Content = (responses) => {
  const state$ = model(responses)

  return {
    DOM: view(state$),
    title$: state$.pluck(`routeTitle`),
  }
}

export default Content
