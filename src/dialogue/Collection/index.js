import { Observable } from 'rx'

const intent = () => ({})
const model = ( _, filter) => ({ filter })
const view = ({ filter }) => Observable.of(`Home ${filter}`)

export const MakeCollection = (params = { filter: 'SHOW_ALL' }) => (responses) => {
  return {
    title$: Observable.of(`Home ${params.filter}`),
    DOM: view(model(intent(responses), params.filter)),
  }
}

export const Collection = MakeCollection()

export default { MakeCollection, Collection }
