const { run } = require(`@cycle/core`)
const { Main } = require(`dialogue/Main`)
const { drivers } = require(`./drivers`)

run(Main, drivers)
