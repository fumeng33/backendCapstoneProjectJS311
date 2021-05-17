let connections = require("../sql/connections");



//GET// list all books
let allBooks = (req, res) => {
  console.log("Inside the GET list all books funciton", req.params);
  let id = req.params.id
  let sql = "SELECT id, book_title FROM books WHERE id =?"
  connections.query(sql, [id], (error, rows) => {
    console.log("ROWS:", rows)
    if (error) {
      console.error("failed to query the db", error);
      res.sendStatus(500);
    } else if (!rows || rows.length == 0) {
      res.sendStatus(404);
    } else {
      res.send(rows[0]);
    }
  })

  res.send("success")
}

//GET// list books by id
let booksById = (req, res) => {
  console.log("Inside the GET list books by ID funciton", req.params.id);

  res.send("success")
}

//GET// list genre
let genre = (req, res) => {
  console.log("Inside the GET list book genre function", req.params);
  res.send("success")
}

//GET// list authors
let authors = (req, res) => {
  console.log("Inside the GET list book authors function", req.params);
  res.send("success")
}

//PUT// edit or update book
let editBookById = (req, res) => {
  console.log("Inside the edit book function", req.params.id);
  res.send("success")
}

//POST// add book
let addBook = (req, res) => {
  console.log("Inside the add book  function", req.body);
  res.send("success")
}

//DELETE// delete book
let deleteBook = (req, res) => {
  console.log("Inside the delete book function", req.body);
  res.send("success")
}


module.exports = { allBooks, booksById, genre, authors, editBookById, addBook, deleteBook };