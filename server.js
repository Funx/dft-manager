import express from 'express'
const server = express()


// proxy the request for static assets
server.get('/db', express.static(`./static/bdd.json`))
server.post('/test', (req, res) => {
  console.log('post')
  res.send('POST request to the homepage')
})

// run the two servers
server.listen(3001, () => console.log('listening to localhost:3001'))
