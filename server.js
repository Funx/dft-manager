import express from 'express'

// --------your proxy----------------------
const server = express()

// proxy the request for static assets
server.use('/assets', express.static(`static`))

// run the two servers
server.listen(3001, 'localhost', () => console.log('listening to localhost:3001'))
