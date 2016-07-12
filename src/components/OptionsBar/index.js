import {Observable as O} from 'rx'
import {div, span} from '@cycle/dom'
import isolate from '@cycle/isolate'
import {L} from 'stanga'

import SearchForm from 'components/SearchForm'
import Dropdown from 'components/Dropdown'
import {Checkbox} from 'components/Checkbox'

import css from './options.css'
import dot from 'utils/dot'

export const OptionsBar = ({DOM, M}) => {
  const sortProps = {
    'benefits': 'Bénéfices (k)',
    'benefitsRate': 'Bénéfices (%)',
    'price': 'Prix de vente',
    'cost': 'Coût de revient',
    'alphabetical': 'Alphabétique',
  }
  const sortPropLens = L.compose('sortOptions', 'property')
  const SortPropInput = isolate(Dropdown(sortProps), 'property')
  const sortPropInput = SortPropInput({DOM, M: M.lens(sortPropLens)})

  const sortOrderLens = L.compose('sortOptions', 'ascending')
  const sortOrderInput = Checkbox({DOM, M: M.lens(sortOrderLens)})

  const queryLens = L.compose('filters', 'query')
  const searchForm = SearchForm({DOM, M: M.lens(queryLens)})

  return {
    DOM: view(
      searchForm.DOM,
      sortPropInput.DOM,
      sortOrderInput.DOM),
    M: O.merge(
      searchForm.M,
      sortPropInput.M,
      sortOrderInput.M),
  }
}
export default OptionsBar

function view (searchForm, sortProp, sortOrder) {
  return O.combineLatest(
    searchForm, sortProp, sortOrder,
    (searchForm, sortProp, sortOrder) =>

    /* markup */
    div(dot(css.fixedContainer), [
      searchForm, sortProp, span(dot(css.sortOrder), [sortOrder]),
    ]),
    /* /markup */
  )
}
