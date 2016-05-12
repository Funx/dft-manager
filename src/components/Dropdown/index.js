import {select, option} from '@cycle/dom'

export const Dropdown = (options) => ({DOM, M}) => ({
  DOM: view(options)(M),
  M: M.set(changes(DOM)),
})

export default Dropdown

const view = options => M =>
  M.map(model =>
    select('.model', [
      Object.keys(options).map(value =>
        option({value, selected: (model == value)}, [options[value]])
      ),
    ]),
  )

const changes = (DOM) => DOM.select('.model')
  .events('change')
  .map(evt => evt.target.value)
  .distinctUntilChanged()
