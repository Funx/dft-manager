import {Observable as O} from 'rx'
import {div} from '@cycle/dom'
import dot from 'utils/dot'
import css from './searchable.css'

import renderStatus from './renderStatus'

export const view = (M, searchForm$, collection$) =>
  O.combineLatest(
    M, searchForm$.DOM, collection$.DOM,
    (searchResults, searchForm, collection) =>
      div(dot(css.contentWrapper), [
        searchForm,
        renderStatus(searchResults),
        collection,
      ])
  )

export default view
