import Dashboard from 'pages/Dashboard'
import {SearchableCollection} from 'pages/SearchableCollection'
import Editor from 'pages/Editor'
import {h1} from '@cycle/dom'

export const routes = {
  '/': Dashboard,
  '/dashboard': Dashboard,
  '/everything': SearchableCollectionOnce(),
  '/stocks': SearchableCollectionOnce(),
  '/craft': SearchableCollectionOnce(),
  '/editor': Editor,
  '*': h1(`Page could not be found, yayaya`),
}
export default routes

function SearchableCollectionOnce() {
  let collection = null

  return (...args) => {
    if(!collection) {
      collection = SearchableCollection(...args)
    }
    return collection
  }

}
