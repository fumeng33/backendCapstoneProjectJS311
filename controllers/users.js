const mysql = require('mysql')
const pool = require('../sql/connection')
const find = require ("lodash")
const { handleSQLError } = require('../sql/error')



const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM userlist", (err, rows) => {
    if (err) {
      console.error('err when creating db', err)
      res.sendStatus(500)
    }
    else {
      res.json(rows);
    }
  })
}

// const getAllUsers = (req, res) => {
//   pool.query("SELECT * FROM userlist", (err, rows) => {
//     if (err) return handleSQLError(res, err)
//     return res.json(rows);
//   })
// }

const getUserById = (req, res) => {
  let sql = "SELECT * FROM userlist WHERE id = ? "
  sql = mysql.format(sql, [req.params.id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}


const getUserByEmail = (req, res) => {
  let email = req.body.email
  sql = mysql.format(sql, [email])

  pool.query("SELECT * FROM userlist WHERE email = ? ", (err, rows) => {
    if (err) {
      console.error('err when creating db', err)
      res.sendStatus(500)
    }
    else {
      res.json(rows);
    }
  })

  // let sql = "SELECT * FROM booksdb2.userlist WHERE email = ? "
  // sql = mysql.format(sql, [req.body.email])

  // pool.query(sql, (err, rows) => {
  //   if (err) return handleSQLError(res, err)
  //   return res.json(rows);
  // })
}

const createUser = (req, res) => {
  let sql = "INSERT INTO userlist (name, email, password) VALUES(?, ?, ?)" 
  // sql = mysql.format(sql, [req.body.name, req.body.email, req.body.password])
  console.log(req.body)
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({newId: results.insertId});
  })
}

const updateUserById = (req, res) => {
  let sql = "UPDATE userlist SET email = ?, password = ? WHERE id =?"
  sql = mysql.format(sql, [req.body.email, req.body.password, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserById = (req, res) => {
  let sql = "DELETE FROM userlist WHERE id = ?"
  sql = mysql.format(sql, [req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  getUserByEmail
}