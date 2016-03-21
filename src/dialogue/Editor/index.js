import { Observable } from 'rx'

const intent = () => ({})
const model = () => ({})
const view = () => Observable.of(`Editor`)

export const Editor = (responses) => {
  return {
    title$: Observable.of(`Editor`),
    DOM: view(model(intent(responses))),
  }
}

export default Editor
