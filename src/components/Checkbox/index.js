import {Observable as O} from 'rx'
import {input, label, span} from '@cycle/dom'

export const Checkbox = ({props$ = O.of({}), M, DOM}) => {
  const status$ = DOM.select('.m-checkbox')
    .events('change')
    .pluck('target', 'checked')

  return {
    DOM: O.combineLatest(
      props$, M,
      ({className = '', attributes = {}, label}, checked) => {
        const attrs = {
          ...attributes,
          attrs: {
            ...attributes.attrs,
            checked,
          },
        }

        return renderCheckbox(className, '.m-checkbox', attrs, label)
      }),
    M: M.set(status$),
  }
}
export default Checkbox


export function renderCheckbox (className, selector, attrs, labelName=[span()]) {
  return label(className, [
    input(selector, {props: {...attrs, type: 'checkbox'}}),
    ...labelName,
  ])
}
