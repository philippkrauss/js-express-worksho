const express = require('express')
const mysql = require('mysql')

const app = express()

// do something asynchronous
function doSomeAsynchronousWork (callback) {
  setTimeout(() => {
    callback(null)
  }, 2000)
}

app.get('/delay', (req, res) => {
  doSomeAsynchronousWork((error) => {
    res.send('done')
  })
})

// talk to database
app.get('/db', (req, res) => {
  const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'my-secret-pw',
    database: 'workshop'
  })

  dbConnection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      return res.status(500).send(error)
    }
    return res.send(results)
  })
  //usage with placeholders:
  //dbConnection.query('SELECT * FROM users where ID = ?', 'my-id', (error, results) => {
})

// set port
app.listen(3000, () => {
  console.log('Node app is running on port 3000')
})


