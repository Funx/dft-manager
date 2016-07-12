import {div, input, button} from '@cycle/dom'
import css from './searchForm.css'
import dot from 'utils/dot'

export function view (M) {
  return M.map(query => {
    const attributes = {props: {
      placeholder: 'filtrer par mot-clés',
      value: query,
    }}
    const clearBtn = query ? button('.i-clear', '╳') : ''

    /* markup */
    return div(dot(css.container), [
      input(dot(css.inputSearch) + '.i-query', attributes),
      clearBtn,
    ])
    /* /markup */
  })
}
export default view
