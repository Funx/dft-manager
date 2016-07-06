import {curry} from 'ramda'
import {input, label, span} from '@cycle/dom'

export const renderCheckbox = curry((model, className, prop, labelName) =>
  (Checkbox(className, `.m-${prop}`, {checked: model[prop]}, [
    span(labelName),
  ])))

export function Checkbox (className, selector, attrs, labelName) {
  return label(className, [
    input(selector, {props: {...attrs, type: 'checkbox'}}),
    ...labelName,
  ])
}
export default Checkbox
