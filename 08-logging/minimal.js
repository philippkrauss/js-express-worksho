const express = require('express')
const {loggerInjector} = require('./logging')

const app = express()

// logging
app.use(loggerInjector)
app.get('/logging', (req, res) => {
  req.logger.info('Hello, Logger!')
  return res.send('Hello, World!')
})

// set port
app.listen(3000, () => {
  console.log('Node app is running on port 3000')
})

