import { Rx } from '@cycle/core'
import { h } from '@cycle/dom'

const intent = ({ DOM }) => ({})
const model = ({ scroll$ }) => ({})
const view = (state$) => Rx.Observable.just(`Dashboard`)

const Dashboard = (responses: Object) => {
  const actions: Object = intent(responses)
  const state$: Rx.Observable = model(actions)
  const view$: Rx.Observable = view(state$)
  return {
    title$: Rx.Observable.just(`Home`),
    DOM: view$,
  }
}

export default Dashboard
export { Dashboard }
