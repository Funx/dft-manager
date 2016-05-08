import {ul, li, a, small} from '@cycle/dom'
import dot from 'utils/dot'
import css from './navigation.css'

export const navigation = ({route, items}) => (ul(dot(css.container), [
  navLink(route.pathname, '/', 'Dashboard'),
  navLink(route.pathname, '/everything', [
    `Everything`,
    small([' ('+ items.length +')']),
  ]),
  navLink(route.pathname, '/stocks', [`Stocks`]),
  navLink(route.pathname, '/craft', [`Crafts`]),
  navLink(route.pathname, '/editor', [`Editor`]),
]))
export default navigation

function navLink (currRoute, url, children) {
  let className = dot(css.link)
  if (currRoute === url) className += dot(css.active)
  return li(className,
    a({href: url}, children),
  )
}
