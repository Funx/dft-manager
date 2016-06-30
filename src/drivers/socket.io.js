import io from 'socket.io-client'

var socket = io.connect('http://localhost:3000')
socket.on('transaction', function (data) {
  console.log(data)
  socket.emit('my other event', { my: 'data' })
})
