import {Observable as O} from 'rx'
import {run} from '@cycle/rx-run'
import express from 'express'
import http from 'http'

import {makeSocketDriver} from 'drivers/socket.io.server'
import {stateMachine} from 'dataHandlers/stateMachine'
import {makeDatabaseDriver} from 'drivers/database'

const {ENVIRONMENT, PORT, REDIS_URL} = process.env

const app = express()
const server = http.Server(app)

app.use('/', express.static(`./dist`))
app.use('/*', express.static(`./dist/index.html`))
server.listen(PORT || 3001,
  () => console.log(`listening to port ${PORT || 3001}`)) // eslint-disable-line no-console

const drivers = {
  WS: makeSocketDriver(server),
  DB: makeDatabaseDriver(REDIS_URL, {fake: ENVIRONMENT != 'production'}),
}
run(main, drivers)

function main ({WS, DB}) {
  const initialState$ = DB.initialState()
  const transactions$ = WS.listen('transaction').pluck('message')
  const currentState$ = stateMachine([transactions$], initialState$)
  const connection$ = WS.connection()
  const welcome$ = connection$.withLatestFrom(
    currentState$,
    ({socket}, state) => ({
      socket,
      name: 'welcome',
      message: state.toArray(),
    }))

  return {
    WS: O.merge(
      welcome$,
      WS.listen('transaction').map(x => ({...x, broadcast: true}))
    ),
    DB: currentState$.skip(1).debounce(1000),
  }
}
