import {h} from '@cycle/dom'
import latestObj from 'rx-combine-latest-obj'
import styles from './navbar.css'
import mainStyles from 'dialogue/Main/main.css'
import {dot} from 'utils'
const {
  div,
  h1,
  span,
} = require(`hyperscript-helpers`)(h)

const intent = ({DOM}) => ({
  scroll$: DOM
    .select(dot(mainStyles.contentContainer))
    .events(`scroll`),
})

const model = ({
  scroll$,
}, title$ ) => latestObj({
  scrollPosition: scroll$
    .map(e => e.target.scrollTop)
    .startWith(0),

  currentTitle: title$,
})

function calculateNavbarStyle(y) {
  if (y > 0) {
    const position = y >= 50 ? 0 : 50 - y
    return {
      paddingTop: `${position}px`,
      backgroundColor: `rgba(0, 120, 255, ${ y / 50})`,
    }
  }
  return {}
}

function calculateTitleStyle(y) {
  if (y > 0) {
    return {
      color: `rgb(${y * 10.2}, ${120 + y * 5.4 }, 255)`,
      fontSize: `${y > 50 ? 1 : 2 - y / 50}em`,
    }
  }
  return {}
}

const view = state$ => state$.map(({
  currentTitle,
  scrollPosition,
}) =>
  div(dot(styles.navbar), {
    style: calculateNavbarStyle(scrollPosition),
  }, [
    h1(dot(styles.title), {
      style: calculateTitleStyle(scrollPosition),
    }, [
      `${currentTitle}`,
    ]),
    span(),
  ])
)

const Navbar = (responses, title$) => {
  const actions = intent(responses)
  const state$ = model(actions, title$)
  const view$ = view(state$)
  return {
    DOM: view$,
  }
}

export default Navbar
export {Navbar}
