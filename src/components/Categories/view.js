import {input, label, span, div} from '@cycle/dom'
import css from './categories.css'
import dot from 'utils/dot'

export const view = options => M =>
  M.map(model => div(dot(css.container), [
    div(dot(css.all),
      mapObjKeys(renderCheckBox(model), {all: options.all} )),
    span(dot(css.separator), '|'),
    div(dot(css.leftSide),
      mapObjKeys(renderCheckBox(model), options.leftSide)),
    div(dot(css.rightSide),
      mapObjKeys(renderCheckBox(model), options.rightSide)),
  ]))

export default view

const mapObjKeys = (fn, obj) => Object.keys(obj).map(key => fn(obj[key], key))

function renderCheckBox (model) {
  return (labelName, prop) =>
    (checkBox(`.m-${prop}`, {checked: model[prop]}, [labelName]))
}

function checkBox (classname, attrs, labelName) {
  return label(dot(css.checkbox), [
    input(classname, {...attrs, type: 'checkbox'}),
    span({type: 'button'}, labelName),
  ])
}
