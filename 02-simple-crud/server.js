const express = require('express')

const app = express()
app.use(express.json())

const {usersRepository} = require('./usersRepository')

// Retrieve all users
app.get('/users', (req, res) => {
  return res.send({data: usersRepository.getUsers(), message: 'users list.'})
})

// Retrieve user with id
app.get('/users/:id', (req, res) => {
  const userId = req.params.id
  const user = usersRepository.getUser(userId)
  if (!user) {
    return res.status(404).send({message: 'could not find user with id ' + userId})
  }
  return res.send({data: user, message: 'get one user'})
})

// Add a new user
app.post('/users', (req, res) => {
  const user = req.body.user
  if (!user) {
    return res.status(400).send({error: true, message: 'Please provide user', body: req.body})
  }
  usersRepository.addUser(user)
  return res.send({data: user, message: 'New user has been created successfully.'})
})

//  Overwrite user with id
app.put('/users/:id', (req, res) => {
  const userId = req.params.id
  const newUser = req.body.user
  if (!newUser) {
    return res.status(400).send({message: 'Please provide user'})
  }
  const existingUser = usersRepository.getUser(userId)
  if (!existingUser) {
    return res.status(404).send({message: 'could not find user with id ' + userId})
  }
  usersRepository.overwriteUser(userId, newUser)
  return res.send({data: existingUser, message: 'user has been overwritten successfully.'})
})

//  Delete user
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id
  const user = usersRepository.getUser(userId)
  if (!user) {
    return res.status(404).send({message: 'could not find user with id ' + userId})
  }
  usersRepository.deleteUser(userId)
  return res.send({message: 'User has been deleted successfully.'})
})

let port = 3000
if (process.argv[2]) {
  port = parseInt(process.argv[2])
}
// set port
app.listen(port, () => {
  console.log(`Node app is running on port ${port}`)
})
