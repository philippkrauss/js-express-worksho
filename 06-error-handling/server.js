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

function asyncHandler (callback) {
  return  (req, res, next) => {
    callback(req, res, next)
        .catch(next)
  }
}

// Retrieve all users
app.get('/users', asyncHandler(async (req, res) => {
  const users = await usersRepository.getUsers()
  return res.send({data: users, message: 'users list.'})
}))

// Retrieve user with id
app.get('/users/:id', asyncHandler(async (req, res) => {
  const userId = req.params.id
  const user = await usersRepository.getUser(userId)
  if (!user) {
    return notFound(res, userId)
  }
  return res.send({data: user, message: 'get one user'})
}))

// Add a new user
app.post('/users', asyncHandler(async (req, res) => {
  const user = req.body.user
  if (!user) {
    return res.status(400).send({message: 'Please provide user', body: req.body})
  }
  await usersRepository.addUser(user)
  return res.send({data: user, message: 'New user has been created successfully.'})
}))

//  Overwrite user with id
app.put('/users/:id', asyncHandler(async (req, res) => {
  const userId = req.params.id
  const newUser = req.body.user
  if (!newUser) {
    return res.status(400).send({message: 'Please provide user'})
  }
  const existingUser = await usersRepository.getUser(userId)
  if (!existingUser) {
    return notFound(res, userId)
  }
  await usersRepository.overwriteUser(userId, newUser)
  return res.send({data: newUser, message: 'user has been overwritten successfully.'})
}))

//  Delete user
app.delete('/users/:id', asyncHandler(async (req, res) => {
  const userId = req.params.id
  const existingUser = await usersRepository.getUser(userId)
  if (!existingUser) {
    return notFound(res, userId)
  }
  await usersRepository.deleteUser(userId)
  return res.send({message: 'User has been deleted successfully.'})
}))

// noinspection JSUnusedLocalSymbols
app.use((err, req, res, next) => {
  return internalServerError(res, err)
})

let port = 3000
if (process.argv[2]) {
  port = parseInt(process.argv[2])
}
// set port
app.listen(port, () => {
  console.log(`Node app is running on port ${port}`)
})

