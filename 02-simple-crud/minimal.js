const express = require('express')

const app = express()

//GET, POST, PUT and DELETE endpoints
app.get('/', (req, res) => {
  return res.send('GET endpoint')
})

app.post('/', (req, res) => {
  return res.send('POST endpoint')
})

app.put('/', (req, res) => {
  return res.send('PUT endpoint')
})

//return a different status code
// see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status for details
app.delete('/', (req, res) => {
  return res.status(204).send()
})

//body parsing
app.use(express.json())
app.post('/body-parsing', (req, res) => {
  return res.send({requestBody: req.body})
})

//path parameters
app.get('/path/:id', (req, res) => {
  const idParameter = req.params.id
  return res.send({id: idParameter})
})

//query parameters
app.get('/query', (req, res) => {
  const idParameter = req.query.id
  return res.send({id: idParameter})
})

app.listen(3000, () => {
  console.log('Node app is running on port 3000')
})
