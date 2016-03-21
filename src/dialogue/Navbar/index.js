import { h } from '@cycle/dom'
import { Observable } from 'rx'
const {
  ul,
  li,
  a,
} = require(`hyperscript-helpers`)(h)

export const Navbar = () => {
  const view$ = Observable.of(
    ul([
      li(
        a({href: `/`}, `Dashboard`),
      ),
      li(
        a({href: `/everything`}, `Everything`),
      ),
      li(
        a({href: `/stocks`}, `Stocks`),
      ),
      li(
        a({href: `/craft`}, `Crafts`),
      ),
      li(
        a({href: `/editor`}, `Editor`),
      ),
    ]),
  )

  return {
    DOM: view$,
  }
}
export default Navbar
