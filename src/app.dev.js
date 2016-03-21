const { run } = require(`@cycle/core`)
const { Main } = require(`dialogue/Main`)
const { drivers } = require(`./drivers`)
const { makeDOMDriver } = require(`@cycle/dom`)
const { makeHistoryDriver } = require(`cycle-history`)

run(Main, {
  ...drivers,
  DOM: makeDOMDriver(`.app`),
  History: makeHistoryDriver({
    hash: false,
    queries: true,
  }),
})
