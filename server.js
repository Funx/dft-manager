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
  console.log(socket.id)
  fs.readJson('./static/bdd.json')
    .then(x => socket.emit('welcome', x))

  socket.on('disconnect', () => io.emit('user disconnected'))
  socket.on('transaction', (x) => console.log(x))
  setTimeout(() => socket.emit('transaction', { hello: 'caca' }), 2000)
})

// run the two servers
server.listen(3001, () => console.log('listening to localhost:3001'))
