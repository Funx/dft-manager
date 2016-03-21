import { Observable } from 'rx'
import { h } from '@cycle/dom'
const {
  div,
} = require(`hyperscript-helpers`)(h)

import Navbar from 'dialogue/Navbar'
import Content from 'dialogue/Content'
import clickOnLinks from './clickOnLinks'

const Main = responses => {
  const content = Content(responses)
  const navbar = Navbar(responses, content.title$)

  const view$ = Observable.of(
    div([
      navbar.DOM,
      content.DOM,
    ])
  )
  const url$ = clickOnLinks(responses)

  return {
    DOM: view$,
    History: url$,
  }
}

export { Main }
