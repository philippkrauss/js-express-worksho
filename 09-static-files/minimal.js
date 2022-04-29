const express = require('express')

const app = express()

//static file serving
app.use('/assets', express.static('public'))

// set port
app.listen(3000, () => {
  console.log('Node app is running on port 3000')
})

