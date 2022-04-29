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

app.get('/delay', async (req, res) => {
  await doSomeAsynchronousWork()
  res.send('done')
})

// talk to database
app.get('/db', async (req, res) => {
  try {
    const dbConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'my-secret-pw',
      database: 'workshop'
    })
    const results = await dbConnection.query('SELECT * FROM users')
    res.send(results)
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
})

// set port
app.listen(3000, () => {
  console.log('Node app is running on port 3000')
})
