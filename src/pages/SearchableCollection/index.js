import {Observable as O} from 'rx'
import {div} from '@cycle/dom'
import {L} from 'stanga'

import SearchForm from 'components/SearchForm'
import Collection from 'components/Collection'
import dot from 'utils/dot'

import css from './searchable.css'
import {StatusBar} from './statusBar.js'
import {filterFn} from './filterFn.js'

export const SearchableCollection = ({DOM, M}) => {
  const searchResults$ = M.lens(L.props('query', 'items'))
      .lens(L.lens(
        ({items, query}) => filterFn(query, items).slice(0, 199),
        (items, model) => ({...model, items})
    ))

  const searchForm = SearchForm({DOM, M: M.lens('query')})
  const collection = Collection({DOM, M: searchResults$})
  const statusBar = StatusBar({DOM, M: searchResults$})
  return {
    DOM: view(searchForm.DOM, collection.DOM, statusBar.DOM),
    M: searchForm.M,
  }
}

function view (searchForm$, collection$, statusBar$) {
  return O.combineLatest(
    searchForm$, collection$, statusBar$,
    (searchForm, collection, statusBar) =>
      div(dot(css.contentWrapper), [
        searchForm,
        collection,
        statusBar,
      ])
  )
}
