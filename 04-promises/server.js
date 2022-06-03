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
  usersRepository.getUsers()
      .then(users => res.send({data: users, message: 'users list.'}))
      .catch(err => internalServerError(res, err))
})

// Retrieve user with id
app.get('/users/:id', (req, res) => {
  const userId = req.params.id
  usersRepository.getUser(userId)
      .then(user => {
        if (!user) {
          return notFound(res, userId)
        }
        return res.send({data: user, message: 'get one user'})
      })
      .catch(err => internalServerError(res, err))
})

// Add a new user
app.post('/users', (req, res) => {
  const user = req.body.user
  if (!user) {
    return res.status(400).send({message: 'Please provide user', body: req.body})
  }
  usersRepository.addUser(user)
      .then(() => res.send({data: user, message: 'New user has been created successfully.'}))
      .catch(err => internalServerError(res, err))
})

//  Overwrite user with id
app.put('/users/:id', (req, res) => {
  const userId = req.params.id
  const newUser = req.body.user
  if (!newUser) {
    return res.status(400).send({message: 'Please provide user'})
  }
  usersRepository.getUser(userId)
      .then(existingUser => {
        if (!existingUser) {
          throw new Error('not found')
        }
        return usersRepository.overwriteUser(userId, newUser)
      })
      .then(() => res.send({data: newUser, message: 'user has been overwritten successfully.'}))
      .catch(err => {
        if (err.message === 'not found') {
          return notFound(res, userId)
        }
        return internalServerError(res, err)
      })
})

//  Delete user
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id

  usersRepository.getUser(userId)
      .then(existingUser => {
        if (!existingUser) {
          throw new Error('not found')
        }
        return usersRepository.deleteUser(userId)
      })
      .then(() => res.send({message: 'User has been deleted successfully.'}))
      .catch(err => {
        if (err.message === 'not found') {
          return notFound(res, userId)
        }
        return internalServerError(res, err)
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

