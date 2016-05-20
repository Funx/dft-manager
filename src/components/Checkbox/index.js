import {curry} from 'ramda'
import {input, label, span} from '@cycle/dom'

export const renderCheckbox = curry((model, className, labelName, prop) =>
  (Checkbox(className, `.m-${prop}`, {checked: model[prop]}, [labelName])))

export function Checkbox (className, selector, attrs, labelName) {
  return label(className, [
    input(selector, {...attrs, type: 'checkbox'}),
    span(labelName),
  ])
}
export default Checkbox
