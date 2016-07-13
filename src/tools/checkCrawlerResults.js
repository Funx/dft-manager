import {pipe} from 'ramda'

export function checkCrawlerResults (results) {
  const errors = results.reduce((acc, x) => {
    const cond = makeCond(x.uniqueKey)
    const crawlerErrors = pipe(
      cond(x.responseStatus < 400, `Server error: ${x.responseStatus}`),
      cond(!x.errorInfo, `Crawler javascript error: ${x.errorInfo}`),
      cond((x.label == `Page d'équipement`) ? x.pageFunctionResult : true, `pageFunctionResult is null`)
    )([])

    var parserErrors = []
    if (x.label == `Page d'équipement` && x.pageFunctionResult)  {
      const results = x.pageFunctionResult
      parserErrors = pipe(
        cond(results.id, `Missing id`),
        cond(results.name, `Missing name`),
        cond(results.type, `Missing type`),
        cond(results.img, `Missing img`),
      )([])
    }

    return [
      ...acc,
      ...crawlerErrors,
      ...parserErrors,
    ]
  }, [])

  if (errors.length) {
    throw new Error(
      `Errors while checking the crawler results:
      ${JSON.stringify(errors, null, 2)}`
    )
  }
  return errors
}

function makeCond (scope) {
  return (test, message) => acc => (test) ? acc : [...acc, scope + ': ' + message]
}
