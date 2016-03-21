import { Observable } from 'rx'

const intent = () => ({})
const model = () => ({})
const view = () => Observable.of(`Dashboard`)

export const Dashboard = (responses) => {
  return {
    title$: Observable.of(`Dashboard`),
    DOM: view(model(intent(responses))),
  }
}

export default Dashboard
