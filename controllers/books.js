const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllBooks = (req, res) => {
  pool.query('SELECT * FROM books', (err, rows) => {
    console.log(err)
    if(err) return handleSQLError(res, err)
  
    return res.json(rows)
  })
}

const getBookById = (req, res) => {
  let sql = "SELECT * FROM books WHERE book_id = ? "
  sql = mysql.format(sql, [req.params.id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createBook = (req, res) => {
  let sql = "INSERT INTO books (title, author, year, category) VALUES(?, ?, ?, ?)" 
  console.log(req.body)
  sql = mysql.format(sql, [eq.body.title,req.body.author,req.body.year, req.body.category])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({newId: results.insertId});
  })
}

module.exports = {getAllBooks, getBookById, createBook}