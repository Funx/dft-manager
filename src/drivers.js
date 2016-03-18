const { makeDOMDriver } = require(`@cycle/dom`)
const { makeHistoryDriver } = require(`cycle-history`)

const drivers = {
  DOM: makeDOMDriver(`.app`),
  History: makeHistoryDriver({
    hash: false,
    queries: true,
  }),
}

export default drivers
export { drivers }
