const express = require('express')
const mysql = require('promise-mysql')

const app = express()

// do something asynchronous
function doSomeAsynchronousWork () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, 2000)
  })
}

app.get('/delay', (req, res) => {
  doSomeAsynchronousWork().then(() => {
    res.send('done')
  })
})

// talk to database
app.get('/db', (req, res) => {
  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'my-secret-pw',
    database: 'workshop'
  }).then((dbConnection) => {
    return dbConnection.query('SELECT * FROM users')
  }).then((results) => {
    return res.send(results)
  }).catch((error) => {
    return res.status(500).send({error: error.message})
  })
})

// set port
app.listen(3000, () => {
  console.log('Node app is running on port 3000')
})
