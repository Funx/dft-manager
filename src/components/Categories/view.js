import {span, div} from '@cycle/dom'
import css from './categories.css'
import dot from 'utils/dot'

import {renderCheckbox} from 'components/Checkbox'

const availableCategories = {
  all: 'tous',
  leftSide: {
    favorites: 'favoris',
    crafts: 'en cours de craft',
    stocks: 'en vente',
  },
  rightSide: {
    outdated: 'à mettre à jour',
  },
}

export const view = options => M =>
  M.map(({currentCategories, outdated}) => {
    const toCheckbox = renderCheckbox(currentCategories, dot(css.checkbox))
    return div(dot(css.container), [
      div(dot(css.all),
        mapObjKeys(toCheckbox, {all: 'tous'})),
      span(dot(css.separator), '|'),
      div(dot(css.leftSide),
        mapObjKeys(toCheckbox, options.leftSide)),
      div(dot(css.rightSide),
        mapObjKeys(toCheckbox, {outdated: options.rightSide.outdated + ' (' + outdated + ')'}),
      ),
    ])
  }
)

export default view

const mapObjKeys = (fn, obj) => Object.keys(obj).map(key => fn(obj[key], key))
