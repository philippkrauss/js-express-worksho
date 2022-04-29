const express = require('express')

const app = express()

// use a middleware for all requests
// see https://expressjs.com/en/4x/api.html#app.use
app.use((req, res, next) => {
  console.log('path: ' + req.path)
  console.log('method: ' + req.method)
  next()
})
app.get('/middleware-a', (req, res) => {
  return res.send('Hello, World a!')
})
app.get('/middleware-b', (req, res) => {
  return res.send('Hello, World b!')
})

// use a middleware for a specific request
app.get('/middleware-c', (req, res, next) => {
  console.log('Hello, specific middleware!')
  next()
})
app.get('/middleware-c', (req, res) => {
  return res.send('Hello, World c!')
})

// set port
app.listen(3000, () => {
  console.log('Node app is running on port 3000')
})

