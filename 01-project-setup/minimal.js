const express = require('express')

const app = express()

// default route
app.get('/', (req, res) => {
  return res.send('Hello, World!')
})

// set port
app.listen(3000, () => {
  console.log('Node app is running on port 3000')
})

