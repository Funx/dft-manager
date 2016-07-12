// pure, testable
export const getUrlWith = (locationOrigin, event) =>
  event.target.href.replace(locationOrigin, ``)

// impure shortcut for browser
export const getUrl = (event) =>
  getUrlWith(location.origin, event)

export default getUrl
