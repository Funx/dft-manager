import {select, option, div} from '@cycle/dom'
import css from './dropdown.css'
import dot from 'utils/dot'

export const Dropdown = (options) => ({DOM, M}) => ({
  DOM: view(options)(M),
  M: M.set(changes(DOM)),
})

export default Dropdown

const view = options => M =>
  M.map(model =>
    div(dot(css.select), [
      select('.model', [
        Object.keys(options).map(value =>
          option({value, selected: (model == value)}, [options[value]])
        ),
      ]),
    ])
  )

const changes = (DOM) => DOM.select('.model')
  .events('change')
  .map(evt => evt.target.value)
  .distinctUntilChanged()
