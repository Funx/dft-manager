import Dashboard from './Dashboard'
import {h1} from '@cycle/dom'

export const routes = {
  '/': Dashboard,
  '*': h1(`Page could not be found, yayaya`),
}
export default routes
