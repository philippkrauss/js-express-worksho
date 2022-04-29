const express = require('express')
const mysql = require('promise-mysql')

const app = express()

app.get('/error-not-async', () => {
  throw new Error('sync error...')
})

app.get('/error-async', async (req, res, next) => {
  next(new Error('async error...'))
})

//this is bad, don't do this!
app.get('/error-async-throw', async () => {
  throw new Error('async error throw...')
})

// talk to database using an error handler
function asyncHandler (callback) {
  return (req, res, next) => {
    callback(req, res, next)
        .catch(next)
  }
}

app.get('/db', asyncHandler(async (req, res) => {
  const dbConnection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'my-secret-pw',
    database: 'workshop'
  })
  const results = await dbConnection.query('SELECT * FROM users')
  res.send(results)
}))

// error handlers always have 4 parameters!
app.use((error, req, res, next) => {
  return res.status(500).send({error: error.message})
})

// order matters!
app.get('/error', asyncHandler(async () => {
  throw new Error('an error occurred')
}))

// set port
app.listen(3000, () => {
  console.log('Node app is running on port 3000')
})
