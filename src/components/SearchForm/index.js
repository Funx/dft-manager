import {Observable as O} from 'rx'
import {div, input, button} from '@cycle/dom'

import css from './searchForm.css'
import dot from 'utils/dot'

export const SearchForm = ({DOM, M}) => {

  const intents = intent(DOM)
  const mod$ = O.merge(
    M.set(intents.query),
    M.set(intents.clear.map(() => '')),
  )
  return {
    DOM: view(M),
    M: mod$,
  }
}
export default SearchForm

function view (M) {
  return M.map(query =>
    div(dot(css.container), [
      input(dot(css.inputSearch) + '.i-query', {attrs: {
        placeholder: 'filtrer par mot-clés',
        value: query,
      }}),
      query ? button('.i-clear', '╳') : '',
    ])
  )
}

const ESC_KEY = 27

function intent (DOM) {
  const $input = DOM.select('.i-query')
  return {
    query: O.merge(
        $input.events('change'),
        $input.events('keyup').debounce(50),
      )
      .pluck('target', 'value')
      .distinctUntilChanged(),
    clear: O.merge(
      $input.events('keyup')
        .filter(x => x.keyCode == ESC_KEY),
      DOM.select('.i-clear')
        .events('click')
    ),
  }
}
