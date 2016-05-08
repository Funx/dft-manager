import switchPath from 'switch-path'
import {Observable as O} from 'rx'
import {div} from '@cycle/dom'
import {curry, __} from 'ramda'

import routes from './routes'

export const Router = (responses) => {
  const state$ = responses.M.lens('route')

  const getRoute = curry(switchPath)(__, routes)
  const childSinks$ = state$
    .pluck('pathname')
    .map(getRoute)
    .pluck('value')
    .map(mapIf(
      component => typeof component === 'function',
      component => component(responses)
    ))

  const DOM = flatPluck('DOM', childSinks$)
    .startWith('loading')
    .map(mapIf(
      value => typeof value === 'string',
      value => div(value)
    ))

  const mod$ = O.merge(
    flatPluck('M', childSinks$),
    state$.set(responses.History)
  )

  return {
    DOM: DOM,
    mod$: mod$,
  }
}
export default Router


function flatPluck(propName, stream$) {
  return stream$
    .pluck(propName)
    .filter(x => !!x)
    .switch()
}

function mapIf(cond, fn) {
  return value => cond(value) ? fn(value) : value
}
