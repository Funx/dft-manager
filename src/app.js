const {run} = require(`@cycle/core`)

const {main} = require(`./main`)
const {drivers} = require(`./drivers`)

run(main, drivers)
