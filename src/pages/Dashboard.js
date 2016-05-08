import { Observable } from 'rx'

export const Dashboard = () => {
  return {
    DOM: Observable.of(`Dashboard`),
  }
}

export default Dashboard
