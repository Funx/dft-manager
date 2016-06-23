import {Observable as O} from 'rx'
import {div} from '@cycle/dom'
import dot from 'utils/dot'
import css from './searchable.css'

import renderStatus from './renderStatus'

export const view = (M, searchForm$, collection$, logger$) =>
  O.combineLatest(
    M, searchForm$.DOM, collection$.DOM, logger$.DOM,
    (searchResults, searchForm, collection, logger) =>
      div(dot(css.contentWrapper), [
        searchForm,
        renderStatus(searchResults),
        collection,
        logger,
      ])
  )

export default view
