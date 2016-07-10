import {Observable as O} from 'rx'

export const events = (selector, _events) => {
  if (typeof _events === 'string') {
    _events = _events.split(' ')
  }
  return O.merge(
    _events.map(event => selector.events(event))
  )
}
export default events
