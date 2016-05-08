import {Observable as O} from 'rx'
import {div} from '@cycle/dom'

import Navbar from 'components/Navbar'
import Router from 'pages/Router'

import './reset.css'
import layout from 'pages/layout.css'
import {dot} from './utils/dot'

export const main = (responses) => {
  responses.M.subscribe(x => console.log(x))

  // const items = responses.HTTP.switch().do(x => console.log(x))
  const router = Router(responses)
  const navbar = Navbar(responses)

  const view$ = O.combineLatest(
    navbar.DOM, router.DOM,
    (navbar, router) =>
      div(dot(layout.layout), [
        div(dot(layout.shrink), navbar),
        div(dot(layout.grow), router),
      ])
  )
  const mod$ = O.merge(
    router.mod$,
    // responses.M.lens('items').set(items)
  )

  return {
    DOM: view$,
    M: mod$,
    // HTTP: O.of({url: '/bdd.json'}),
  }
}

export default main
