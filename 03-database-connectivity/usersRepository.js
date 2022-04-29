const mysql = require('mysql')

class UsersRepository {

  constructor () {
    this.dbConn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'my-secret-pw',
      database: 'workshop'
    })
  }

  getUsers (callback) {
    this.dbConn.query('SELECT * FROM users', (error, results) => {
      if (error) {
        return callback(error)
      }
      return callback(null, results)
    })
  }

  getUser (userId, callback) {
    this.dbConn.query('SELECT * FROM users where id=?', userId, (error, results) => {
      if (error) {
        return callback(error)
      }
      return callback(null, results[0])
    })
  }

  addUser (user, callback) {
    this.dbConn.query('INSERT INTO users SET ? ', user, (error) => {
      if (error) {
        return callback(error)
      }
      return callback(null)
    })
  }

  overwriteUser (userId, newUser, callback) {
    this.dbConn.query('UPDATE users SET ? WHERE id = ?', [newUser, userId], (error) => {
      if (error) {
        return callback(error)
      }
      return callback(null)
    })
  }

  deleteUser (userId, callback) {
    this.dbConn.query('DELETE FROM users WHERE id = ?', userId, (error) => {
      if (error) {
        return callback(error)
      }
      return callback(null)
    })
  }
}

const usersRepository = new UsersRepository()
module.exports = {usersRepository}

