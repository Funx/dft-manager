import express from 'express'
import socket from 'socket.io'
import http from 'http'
const app = express()
const server = http.Server(app)
const io = socket(server)

// proxy the request for static assets
app.use('/initialstate', express.static(`./static/bdd.json`))
app.post('/transaction', function (req, res) {
  console.log('POST /db')
  res.send('I hear you, buddy ❤️ \n')
})

io.on('connection', function (socket) {
  socket.emit('transaction', { hello: 'world' })
  socket.on('transaction', function (data) {
    console.log(data)
  })
  socket.on('disconnect', function () {
    io.emit('user disconnected')
  })
})

// run the two servers
server.listen(3001, () => console.log('listening to localhost:3001'))
