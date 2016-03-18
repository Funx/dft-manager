import { Rx } from '@cycle/core'
import { h } from '@cycle/dom'
const {
  div,
} = require(`hyperscript-helpers`)(h)


const intent = ({ DOM }) => ({})
const model = ({ intent$ }) => ({})
const view = (state$) => Rx.Observable.just(`Editor`)

const Dashboard = (responses: Object) => {
  const actions: Object = intent(responses)
  const state$: Rx.Observable = model(actions)
  const view$: Rx.Observable = view(state$)
  return {
    title$: Rx.Observable.just(`Editor`),
    DOM: view$,
  }
}

export default Dashboard
export { Dashboard }
