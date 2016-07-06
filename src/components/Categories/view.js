import {span, div} from '@cycle/dom'
import css from './categories.css'
import dot from 'utils/dot'

import {renderCheckbox} from 'components/Checkbox'

export const view = M =>
  M.map(({currentCategories, outdated}) => {
    const toCheckbox = renderCheckbox(currentCategories, dot(css.checkbox))
    return div(dot(css.container), [
      div(dot(css.all), [
        toCheckbox('all', 'tous'),
      ]),
      span(dot(css.separator), ['|']),
      div(dot(css.leftSide), [
        toCheckbox('favorites', 'favoris'),
        toCheckbox('crafts', 'en cours de craft'),
        toCheckbox('stocks', 'en vente'),
      ]),
      div(dot(css.rightSide), [
        toCheckbox('outdated', `à mettre à jour (${outdated})`),
      ]),
    ])
  }
)

export default view
