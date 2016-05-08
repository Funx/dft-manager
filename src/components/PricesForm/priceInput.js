import {Observable as O} from 'rx'
import {li, input, div, span, label} from '@cycle/dom'


import {dot} from 'utils/dot'
import css from './styles.css'

export function PriceInput ({DOM, M}) {
  const $input = DOM.select('.m-itemPrice')
  const editPrice$ = $input.events('change')
    .map(e => e.target.value)
    .distinctUntilChanged()

  const mod$ = O.merge(
    M.lens('_price').set(editPrice$),
    // M.lens('price').set(editPrice$.map(trim)),
  )

  return {
    DOM: M.map(renderItemForm),
    M: mod$,
  }
}

export default PriceInput

function renderItemForm (item) {
  return li(dot(css.item), {key: item.id}, [
    div(dot(css.name), item.name),
    label(dot(css.price), [
      input('.m-itemPrice' + dot(css.input), {type: 'number', placeholder: '0', value: item.price}),
      span(dot(css.currency), ['kama']),
    ]),
  ])
}
