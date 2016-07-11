import express from 'express'
import socket from 'socket.io'
import http from 'http'
import {Observable as O} from 'rx'
import {stateMachine} from 'dataHandlers/stateMachine'
import {toMap} from 'utils/iterable'
import {createClient} from 'then-redis'
const db = createClient()


const app = express()
const server = http.Server(app)
const io = socket(server)
// proxy the request for static assets
app.use('/initialstate', express.static(`./static/bdd.json`))
app.use('/icons', express.static(`./src/icons/`))

io.on('connection', function (socket) {
  const initialState$ = readState().map(toMap)

  const transactions$ = listen(socket, 'transaction')
  const state$ = stateMachine([transactions$], initialState$)
  initialState$.subscribe(x => socket.emit('welcome', x.toArray()))

  state$.skip(1).map(x => x.toArray())
    .debounce(1000)
    .subscribe(x =>
      db.set('state', JSON.stringify(x))
      .then(() => console.log('successfully wrote state to redis'))
      .catch(x => console.error('error while writing state to redis:', x))
    )
})
function readState () {
  return O.fromPromise(db.get('state').then(JSON.parse))
}

function listen (socket, name) {
  return O.fromEventPattern(
      (h) => socket.on(name, h),
      (h) => socket.removeListener(name, h))
    .shareReplay(1)
}

app.use('/*', express.static(`./dist/dev/index.html`))

server.listen(3001, () => console.log('listening to localhost:3001'))
