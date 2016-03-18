import { h } from '@cycle/dom'
import Dashboard from 'dialogue/Dashboard'
import { MakeCollection } from 'dialogue/Collection'
import Editor from 'dialogue/Editor'

const routes = {
  '/': Dashboard,
  '/dashboard': Dashboard,
  '/everything': MakeCollection({ filter: 'SHOW_ALL' }),
  '/stocks': MakeCollection({ filter: 'SHOW_IN_STOCK' }),
  '/craft': MakeCollection({ filter: 'SHOW_CRAFTING' }),
  '/editor': Editor,
  '*': h(`h1`, `Page could not be found`),
}

export default routes
