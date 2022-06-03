class UsersRepository {

  constructor () {
    this.users = [
      {id: 1, name: 'Test', email: 'test@a.bc'},
      {id: 2, name: 'John', email: 'john@a.bc'},
      {id: 3, name: 'Philipp', email: 'philipp@x.yz'},
      {id: 4, name: 'Alex', email: 'alex@b.cd'},
      {id: 5, name: 'Sandra', email: 'sandra@c.de'},
    ]
  }

  getUsers () {
    return this.users
  }

  getUser (userId) {
    return this.users.find((user) => user.id.toString() === userId.toString())
  }

  addUser (user) {
    this.users.push(user)
  }

  overwriteUser (userId, newUser) {
    const existingUser = this.getUser(userId)
    //delete all fields of old user
    for (const variableKey in existingUser) {
      if (existingUser.hasOwnProperty(variableKey)) {
        delete existingUser[variableKey]
      }
    }
    //assign fields of new user to old user
    Object.assign(existingUser, newUser)
  }

  deleteUser (userId) {
    this.users = this.users.filter(user => user.id.toString() !== userId.toString())
  }
}

const usersRepository = new UsersRepository()
module.exports = {usersRepository}

