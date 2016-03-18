import { Rx } from '@cycle/core'
import { h } from '@cycle/dom'
const {
  div,
} = require(`hyperscript-helpers`)(h)

import styles from './main.css'
import Navbar from 'dialogue/Navbar'
import Sidebar from 'dialogue/Sidebar'
import Content from 'dialogue/Content'
import { dot } from 'utils'

const view = (
  navbar,
  sidebar,
  content,
) => div(dot(styles.app), [
  sidebar,
  div(dot(styles.contentContainer), [
    navbar,
    content,
  ]),
])

const Main = responses => {
  const content = Content(responses)
  const navbar = Navbar(responses, content.title$)
  const sidebar = Sidebar(responses)
  const view$ = Rx.Observable.just(
    view(
      navbar.DOM,
      sidebar.DOM,
      content.DOM,
    )
  )
  return {
    DOM: view$,
    History: sidebar.url$,
  }
}

export { Main }
