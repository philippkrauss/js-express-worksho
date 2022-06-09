const express = require('express')

const app = express()

// default route
app.get('/', (req, res) => {
  return res.send('Hello, World!')
})

let port = 3000
if (process.argv[2]) {
  port = parseInt(process.argv[2])
}
if (process.env['PORT']) {
  port = parseInt(process.env['PORT'])
}
// set port
const server = app.listen( port,() => {
  console.log(`Node app is running on port ${server.address().port}`)
})
