const express = require('express')

const app = express()
app.use(express.json())

const {usersRepository} = require('./usersRepository')

function internalServerError (res, err) {
  return res.status(500).send({message: err})
}

function notFound (res, userId) {
  return res.status(404).send({message: 'could not find user with id ' + userId})
}

// Retrieve all users
app.get('/users', (req, res) => {
  usersRepository.getUsers((err, users) => {
    if (err) {
      return internalServerError(res, err)
    }
    res.send({data: users, message: 'users list.'})
  })
})

// Retrieve user with id
app.get('/users/:id', (req, res) => {
  const userId = req.params.id
  usersRepository.getUser(userId, (err, user) => {
    if (err) {
      return internalServerError(res, err)
    }
    if (!user) {
      return notFound(res, userId)
    }
    return res.send({data: user, message: 'get one user'})
  })
})

// Add a new user
app.post('/users', (req, res) => {
  const user = req.body.user
  if (!user) {
    return res.status(400).send({message: 'Please provide user', body: req.body})
  }
  usersRepository.addUser(user, (err) => {
    if (err) {
      return internalServerError(res, err)
    }
    return res.send({data: user, message: 'New user has been created successfully.'})
  })
})

//  Overwrite user with id
app.put('/users/:id', (req, res) => {
  const userId = req.params.id
  const newUser = req.body.user
  if (!newUser) {
    return res.status(400).send({message: 'Please provide user'})
  }
  usersRepository.getUser(userId, (err, existingUser) => {
    if (err) {
      return internalServerError(res, err)
    }
    if (!existingUser) {
      return notFound(res, userId)
    }
    usersRepository.overwriteUser(userId, newUser, (err) => {
      if (err) {
        return internalServerError(res, err)
      }
      return res.send({data: newUser, message: 'user has been overwritten successfully.'})
    })
  })
})

//  Delete user
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id
  usersRepository.getUser(userId, (err, user) => {
    if (err) {
      return internalServerError(res, err)
    }
    if (!user) {
      return notFound(res, userId)
    }
    usersRepository.deleteUser(userId, (err) => {
      if (err) {
        return internalServerError(res, err)
      }
      return res.send({message: 'User has been deleted successfully.'})
    })
  })
})

let port = 3000
if (process.argv[2]) {
  port = parseInt(process.argv[2])
}
// set port
app.listen(port, () => {
  console.log(`Node app is running on port ${port}`)
})

