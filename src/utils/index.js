/* global location */
import { Rx } from '@cycle/core'

const getUrl = event => {
  return event.target.href.replace(location.origin, ``)
}

const extractValue = (val, obs) => obs.map(obj => obj[val])

const events = (selector, _events) => {
  return Rx.Observable.merge(
    _events.map(event => selector.events(event))
  )
}

const dot = (classNames) => {
  if (typeof classNames === 'string') {
    return classNames
      .split(' ')
      .map(className => `.${className}`)
      .join(' ')
  }
  if (Array.isArray(classNames)) {
    return classNames
      .map(className => `.${className}`)
      .join(' ')
  }
  return `.${classNames}` // forced to return a string starting with .
}

export {
  getUrl,
  extractValue,
  events,
  dot,
}
