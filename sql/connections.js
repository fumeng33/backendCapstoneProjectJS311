const mysql = require('mysql')
require("dotenv").config();

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection..')
      this.pool = mysql.createPool({
        connectionLimit:100,
        host: 'den1.mysql5.gear.host', //process.env.DBHOST
        password: 'Olemiss082894!', 
        database: 'booksdb2'
      })
      return this.pool
    }
    return this.pool
  }
}

const instance = new Connection();

module.exports = instance;