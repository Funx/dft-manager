const { run } = require(`@cycle/core`)
const { Main } = require(`dialogue/Main`)
const { drivers } = require(`./drivers`)
const { makeDOMDriver } = require(`@cycle/dom`)
const { makeHistoryDriver } = require(`cycle-history`)

function clientSideApp(responses) {
  let requests = Main(responses)
  requests.History = requests.History.skip(1)

  return requests
}

run(clientSideApp, {
  ...drivers,
  DOM: makeDOMDriver(`.app`),
  History: makeHistoryDriver({
    hash: false,
    queries: true,
  }),
})
