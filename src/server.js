import {createClient} from 'then-redis'
import {Observable as O} from 'rx'
import socket from 'socket.io'
import express from 'express'
import {compose} from 'ramda'
import fs from 'fs-promise'
import http from 'http'

import {populateRandomData} from 'tools/populateRandomData'
import {prepareDatabase} from 'tools/prepareDatabase'
import {stateMachine} from 'dataHandlers/stateMachine'
import {toMap} from 'utils/iterable'

const {ENVIRONMENT, PORT, REDIS_URL} = process.env
const db = (ENVIRONMENT == 'production') ? createClient(REDIS_URL) : {}
console.log(db.server_info)
const app = express()
const server = http.Server(app)
const io = socket(server)

app.use('/', express.static(`./dist`))
app.use('/*', express.static(`./dist/index.html`))
io.on('connection', socketHandler)
server.listen(PORT || 3001,
  () => console.log(`listening to port ${PORT || 3001}`)) // eslint-disable-line no-console

const initialState$ = readState().map(toMap)
function socketHandler (socket) {
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
    return O.fromPromise(
      db.get('state')
        .then(x => {
          if (!x) return (console.log('initializing db'), initializeDB({fake: false})) // eslint-disable-line no-console
          else return JSON.parse(x)
        })
        .catch(x => console.error('error while reading app state', x, x.stack)) // eslint-disable-line no-console
    )
  } else {
    return O.fromPromise(
      fs.readJson('./storage/db.json')
        .catch(err => {
          if(err.code == 'ENOENT') return (console.log('initializing db'), initializeDB({fake: true})) // eslint-disable-line no-console
          else throw err
        })
        .catch(x => console.error('error while reading app state from filesystem', x)) // eslint-disable-line no-console
    )
  }
}

function writeState (x) {
  if (ENVIRONMENT == 'production') {
    db.set('state', JSON.stringify(x))
      .then((x) => {
        if (x) console.log('successfully written state to redis')
        else console.log('error while writing state to redis', x)
      }) // eslint-disable-line no-console
      .catch(x => console.error('error while writing state to redis:', x)) // eslint-disable-line no-console
  } else {
    fs.writeFile('./storage/db.json', JSON.stringify(x))
      .then(() => console.log('successfully written state to file')) // eslint-disable-line no-console
      .catch(x => console.error('error while writing state to file:', x)) // eslint-disable-line no-console
  }
}
function initializeDB ({fake = false}) {
  return fs.readJson('./storage/crawlerResults.json')
    .then(fake ? compose(populateRandomData, prepareDatabase) : prepareDatabase)
}
