import express from 'express'
import socket from 'socket.io'
import http from 'http'
import fs from 'fs-promise'
const app = express()
const server = http.Server(app)
const io = socket(server)

// proxy the request for static assets
app.use('/initialstate', express.static(`./static/bdd.json`))

io.on('connection', function (socket) {
  fs.readJson('./static/db.json')
    .then(x => socket.emit('welcome', x))
  socket.on('transaction', x => {
    console.time('DB WRITE')
    fs.writeJson('./static/db.json', x)
      .then((x) => (console.timeEnd('DB WRITE'), x))
      .then(() => console.log('Successfully written changes to db.json'))
      .catch((err) => console.error('error while writing db.json:', err))
  })
})

app.use('/*', express.static(`./dist/dev/index.html`))

// run the two servers
server.listen(3001, () => console.log('listening to localhost:3001'))
