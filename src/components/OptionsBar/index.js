import {Observable as O} from 'rx'
import {div, span} from '@cycle/dom'
import isolate from '@cycle/isolate'
import {L} from 'stanga'

import SearchForm from 'components/SearchForm'
import Dropdown from 'components/Dropdown'
import Categories from 'components/Categories'
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

  const currentCategoriesLens = L.pick({
    outdated: 'outdated',
    currentCategories: L.compose('filters', 'currentCategories'),
  })
  const categories = isolate(Categories)
    ({DOM, M: M.lens(currentCategoriesLens)})

  return {
    DOM: view(
      searchForm.DOM,
      sortPropInput.DOM,
      sortOrderInput.DOM,
      categories.DOM),
    M: O.merge(
      searchForm.M,
      sortPropInput.M,
      sortOrderInput.M,
      categories.M),
  }
}
export default OptionsBar

function view (searchForm, sortProp, sortOrder, categories) {
  return O.combineLatest(
    searchForm, sortProp, sortOrder, categories,
    (searchForm, sortProp, sortOrder, categories) =>

    /* markup */
    div([
      div(dot(css.fixedContainer), [
        searchForm, sortProp, span(dot(css.sortOrder), [sortOrder]),
      ]),
      div(dot(css.placeholder)),
      categories,
    ])
    /* /markup */
  )
}

// function renderToggleSortOrder (checked) {
//   const attributes = {
//     checked,
//   }
//   return renderCheckbox(
//     dot(css.favorite), '.m-favorites', attributes, [
//       'ASC/DESC',
//     ],
//   )
// }
