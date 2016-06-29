import { Observable } from 'rx'

export const events = (selector, _events) => {
  if (typeof _events === 'string') {
    _events = _events.split(' ')
  }
  return Observable.merge(
    _events.map(event => selector.events(event))
  )
}
export default events
