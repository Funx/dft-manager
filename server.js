import express from 'express'
const server = express()


// proxy the request for static assets
server.get('/db', express.static(`./static/bdd.json`))
server.post('/db', function (req, res) {
  res.send('I received your request buddy')
})


// run the two servers
server.listen(3001, () => console.log('listening to localhost:3001'))
