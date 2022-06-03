const mysql = require('promise-mysql')

class UsersRepository {

  constructor () {
    mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'my-secret-pw',
      database: 'workshop'
    }).then((dbConn) => {
      this.dbConn = dbConn
    })
  }

  async getUsers () {
    return this.dbConn.query('SELECT * FROM users')
  }

  async getUser (userId) {
    const results = await this.dbConn.query('SELECT * FROM users where id=?', userId)
    return results[0]
  }

  async addUser (user) {
    return this.dbConn.query('INSERT INTO users SET ? ', user)
  }

  async overwriteUser (userId, newUser) {
    return this.dbConn.query('UPDATE users SET ? WHERE id = ?', [newUser, userId])
  }

  async deleteUser (userId) {
    return this.dbConn.query('DELETE FROM users WHERE id = ?', userId)
  }
}

const usersRepository = new UsersRepository()
module.exports = {usersRepository}

