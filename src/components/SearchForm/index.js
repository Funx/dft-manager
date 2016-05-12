import {Observable as O} from 'rx'
import {div, input, button} from '@cycle/dom'

import css from './searchForm.css'
import dot from 'utils/dot'

export const SearchForm = ({DOM, M}) => {

  const intents = intent(DOM)
  const mod$ = M.set(intents.query)

  return {
    DOM: view(M),
    M: mod$,
  }
}
export default SearchForm

function view (M) {
  return M.map(query =>
    div(dot(css.container), [
      input(dot(css.inputSearch) + '.i-query', {
        placeholder: 'type query here',
        value: query,
      }),
      query ? button('╳') : '',
    ])
  )
}

function intent (DOM) {
  const $input = DOM.select('.i-query')
  return {
    query: O.merge(
        $input.events('change'),
        $input.events('keyup').debounce(50),
      )
      .pluck('target', 'value')
      .distinctUntilChanged(),
  }
}
