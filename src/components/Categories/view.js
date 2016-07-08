import {span, div} from '@cycle/dom'
import css from './categories.css'
import dot from 'utils/dot'

import {renderCheckbox} from 'components/Checkbox'
const makeCategoryFilter = (model) => (prop, labelName) =>
  renderCheckbox(dot(css.checkbox), `.m-${prop}`, {checked: model[prop]}, [
    span(labelName),
  ])


export const view = M =>
  M.map(({currentCategories, outdated}) => {
    const CategoryFilter = makeCategoryFilter(currentCategories)
    return div(dot(css.container), [
      div(dot(css.all), [
        CategoryFilter('all', 'tous'),
      ]),
      span(dot(css.separator), ['|']),
      div(dot(css.leftSide), [
        CategoryFilter('favorites', 'favoris'),
        CategoryFilter('crafts', 'en cours de craft'),
        CategoryFilter('stocks', 'en vente'),
      ]),
      div(dot(css.rightSide), [
        CategoryFilter('outdated', `à mettre à jour (${outdated})`),
      ]),
    ])
  }
)

export default view
