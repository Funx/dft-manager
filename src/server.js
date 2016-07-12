import {createClient} from 'then-redis'
import {Observable as O} from 'rx'
import socket from 'socket.io'
import express from 'express'
import fs from 'fs-promise'
import http from 'http'

import {stateMachine} from 'dataHandlers/stateMachine'
import {toMap} from 'utils/iterable'

const {ENVIRONMENT, PORT} = process.env
const {ENV_DIR} = ENVIRONMENT == 'production' ? 'prod' : 'dev'
const db = createClient()
const app = express()
const server = http.Server(app)
const io = socket(server)

app.use('/*', express.static(`./dist/${ENV_DIR}/index.html`))
io.on('connection', socketHandler)
server.listen(PORT || 3001,
  () => console.log(`listening to port ${PORT || 3001}`)) // eslint-disable-line no-console

function socketHandler (socket) {
  const initialState$ = readState().map(toMap)
  // TODO handle multiple clients updates
  const transactions$ = listen(socket, 'transaction')
  const currentState$ = stateMachine([transactions$], initialState$)

  initialState$.subscribe(x => socket.emit('welcome', x.toArray()))
  currentState$.skip(1).map(x => x.toArray())
    .debounce(1000)
    .subscribe(writeState)
}
function listen (socket, name) {
  return O.fromEventPattern(
      (h) => socket.on(name, h),
      (h) => socket.removeListener(name, h))
    .shareReplay(1)
}
function readState () {
  if (ENVIRONMENT == 'production') {
    return O.fromPromise(db.get('state').then(JSON.parse))
  } else {
    return O.fromPromise(
      fs.readJson('./static/db.json')
        .catch(err => {
          if(err.code == 'ENOENT') {
            return fs.readJson('./static/initialState.json')
          } else {
            throw err
          }
        })
        .catch(x =>
          console.error('error while reading app state from filesystem', x)) // eslint-disable-line no-console
    )
  }
}
function writeState (x) {
  if (ENVIRONMENT == 'production') {
    db.set('state', JSON.stringify(x))
      .catch(x => console.error('error while writing state to redis:', x)) // eslint-disable-line no-console
  } else {
    fs.writeFile('./static/db.json', JSON.stringify(x))
      .then(() => console.log('successfully wrote state to file')) // eslint-disable-line no-console
      .catch(x => console.error('error while writing state to file:', x)) // eslint-disable-line no-console
  }
}
