import { Rx } from '@cycle/core'
import { h } from '@cycle/dom'
import latestObj from 'rx-combine-latest-obj'
import switchPath from 'switch-path'
import { GSAP } from 'utils/gsap-widget'
import routes from './routes'
import styles from './content.css'

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
    .flatMap(value => value.DOM || Rx.Observable.just(value))
    .startWith(null)
  const routeTitle$ = childView$
    .flatMap(value => value.title$ || Rx.Observable.just(`Cycle-Starter`))

  return latestObj({
    routeValue$,
    routeTitle$,
  })
  .distinctUntilChanged()
}

const view = state$ => state$
  .map(({ routeValue }) =>
    div(
      { className: styles.content },
      routeValue,
    )
  )
  .distinctUntilChanged()

const Content = (responses) => {
  const state$ = model(responses)
  const view$ = view(state$)
  return {
    DOM: view$,
    title$: state$.pluck(`routeTitle`),
  }
}

export default Content
export { Content }
