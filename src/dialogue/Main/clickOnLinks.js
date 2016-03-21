import { filterLinks } from 'cycle-history'
import { events, getUrl } from 'utils'

export const clickOnLinks = ({ DOM, History }) => events(DOM.select('a'), [
    `click`,
    `touchstart`,
  ])
  .filter(filterLinks)
  .map(getUrl)
  .startWith(History.value.pathname)
  .distinctUntilChanged()
export default clickOnLinks
