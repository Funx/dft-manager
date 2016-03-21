// pure, testable
export const getUrlWith = (locationOrigin, event) =>
  event.target.href.replace(locationOrigin, ``)

// impure, usefull, wrote it that way of it fails in non browser environment
export const getUrl = (event) =>
  getUrlWith(location.origin, event)

export default { getUrl, getUrlWith }
