let connections = require("../sql/connections");

//GET// list all users books
let allBooks = (req, res) => {
  console.log("Inside the GET list all books funciton", req.params);
 connections.query("SELECT * FROM books", (error, rows) => {
    console.log("ROWS:", rows)
    if (error) {
      res.json("failed to get all books")
    } else {
      res.json(rows);
    }
  })

  res.send("success")
}

//GET// list books by id
let booksById = (req, res) => {
  console.log("Inside the GET list books by ID funciton", req.params.id);
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

//GET// list genre
let genre = (req, res) => {
  console.log("Inside the GET list book genre function", req.params);
  let id = req.params.id
  let sql = "SELECT id, genre_name FROM genre WHERE id =?"
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

//GET// list authors
let authors = (req, res) => {
  console.log("Inside the GET list book authors function", req.params);
  let id = req.params.id
  let sql = "SELECT id, author_firstname FROM authors WHERE id =?"
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

//PUT// edit or update book
let editBookById = (req, res) => {
  console.log("Inside the edit book function", req.params.id);
  let id = req.params.id
  let bookTitle = req.body.bookTitle
  let sql = `UPDATE books SET bookTitle = ? WHERE id = ${id}` // mysql statement to update book title on id 
  
  connections.query(sql, [`${bookTitle}`], (error, rows) => {
    console.log("ROWS:", rows)
    // error handling 
    // error === server problem type error 
    if (error) {
      // if we get an error from the db
      console.error("Failed to query the db", error);
      //send error 500
      res.sendStatus(500);
      //if rows === null or undefined || affectedrows === 0, could not find book id to update  
    } else if (!rows || rows.affectedRows == 0) { // do we really need this? 
      // if we get no rows from the database
      res.sendStatus(404);
    } else {
      res.json({id: id, bookTitle: bookTitle, message: 'successfully update the book title.'});
    }
  })
  }
  res.send("success")
}

//POST// add book
let addBook = (req, res) => {
  console.log("Inside the add book  function", req.body);
  let bookTitle = req.body.bookTitle
 let sql = "INSERT INTO ?? (??) VALUES (?)"
 const inserts = ['books', 'bookTitle', `${bookTitle}`]
 sql = mysql.format (sql, inserts)
  //make a connection to send the query
  connections.query(sql, (error, results) => {
    if (error) {
      //return fail
      console.error("Failed to query the db", error);
      res.sendStatus(500);
    } else {
      return res.json({ newId: results.insertId });
    }
  })
}
  res.send("success")
}

//DELETE// delete book
let deleteBook = (req, res) => {
  console.log("Inside the delete book function", req.body);
  let id = req.params.id
  let sql = "DELETE FROM books WHERE id = ?"
  connections.query(sql, [id], function (error, rows) {
    console.log("ROWS:", rows)
    if (error) {
      // if we get an error from the db
      console.error("Failed to query the db", error);
      //send error 500
      res.sendStatus(500);
    } else if (!rows || rows.affectedRows == 0) {
      // if we get no rows from the database
      res.sendStatus(404);
    } else {
      res.send({ id: id, message: 'Successfully deleted a book'});
    }
  })
  res.send("success")
}


module.exports = { allBooks, booksById, genre, authors, editBookById, addBook, deleteBook };