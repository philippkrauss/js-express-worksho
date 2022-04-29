const mysql = require('promise-mysql')

class UsersRepository {

  constructor () {
    mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'my-secret-pw',
      database: 'workshop'
    }).then((connection) => {
      this.dbConn = connection
    })
  }

  getUsers () {
    return this.dbConn.query('SELECT * FROM users')
  }

  getUser (userId) {
    return this.dbConn.query('SELECT * FROM users where id=?', userId)
        .then(results => results[0])
  }

  addUser (user) {
    return this.dbConn.query('INSERT INTO users SET ? ', user)
  }

  overwriteUser (userId, newUser) {
    return this.dbConn.query('UPDATE users SET ? WHERE id = ?', [newUser, userId])
  }

  deleteUser (userId) {
    return this.dbConn.query('DELETE FROM users WHERE id = ?', userId)
  }
}

const usersRepository = new UsersRepository()
module.exports = {usersRepository}

