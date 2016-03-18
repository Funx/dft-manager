import { Rx } from '@cycle/core'
import { h } from '@cycle/dom'
const {
  div,
} = require(`hyperscript-helpers`)(h)

const intent = ({ DOM }) => ({ intent$: '' })

const model = ({ intent$ }) => ({})

const view = (state$) => Rx.Observable.just(
    div(dot(styles.home), [
      `Welcome Home`,
    ])
  )

const MakeCollection = (params) => (responses) => {
  const actions: Object = intent(responses)
  const state$: Rx.Observable = model(actions)
  const view$: Rx.Observable = view(state$)
  return {
    title$: Rx.Observable.just(`Home`),
    DOM: view$,
  }
}

const Collection = MakeCollection()

export default Collection
export { MakeCollection, Collection }
