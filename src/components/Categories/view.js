import {span, div} from '@cycle/dom'
import css from './categories.css'
import dot from 'utils/dot'

import {renderCheckbox} from 'components/Checkbox'

export const view = options => M =>
  M.map(model => {
    const toCheckbox = renderCheckbox(model, dot(css.checkbox))
    return div(dot(css.container), [
      div(dot(css.all),
        mapObjKeys(toCheckbox, {all: options.all})),
      span(dot(css.separator), '|'),
      div(dot(css.leftSide),
        mapObjKeys(toCheckbox, options.leftSide)),
      div(dot(css.rightSide),
        mapObjKeys(toCheckbox, options.rightSide)),
    ])
  }
)

export default view

const mapObjKeys = (fn, obj) => Object.keys(obj).map(key => fn(obj[key], key))
