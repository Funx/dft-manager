import {Observable as O} from 'rx'
import {div} from '@cycle/dom'
import isolate from '@cycle/isolate'
import {L} from 'stanga'
import SearchForm from 'components/SearchForm'
import Dropdown from 'components/Dropdown'
import Categories from 'components/Categories'

import css from './options.css'
import dot from 'utils/dot'

const sortProps = {
  'benefits': 'Bénéfices (k)',
  'benefitsRate': 'Bénéfices (%)',
  'price': 'Prix de vente',
  'cost': 'Coût de revient',
  'alphabetical': 'Alphabétique',
}

const sortOrders = {
  'ascending': 'Croissant',
  'descending': 'Décroissant',
}


export const OptionsBar = ({DOM, M}) => {
  const searchForm = SearchForm({DOM, M: M.lens('query')})
  const sortProp = isolate(Dropdown(sortProps), 'sortProp')
    ({DOM, M: M.lens('sortProp')})
  const sortOrder = isolate(Dropdown(sortOrders), 'sortOrder')
    ({DOM, M: M.lens('sortOrder')})
  const categories = Categories({DOM, M: M.lens('currentCategories')})

  return {
    DOM: view(searchForm.DOM, sortProp.DOM, sortOrder.DOM, categories.DOM),
    M: O.merge(searchForm.M, sortProp.M, sortOrder.M, categories.M),
  }
}
export default OptionsBar

function view (searchForm, sortProp, sortOrder, categories) {
  return O.combineLatest(
    searchForm, sortProp, sortOrder, categories,
    (searchForm, sortProp, sortOrder, categories) =>
    div([
      div(dot(css.container), [
        searchForm, sortProp, sortOrder,
      ]),
      categories,
    ])
  )
}
