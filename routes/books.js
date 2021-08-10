const { kMaxLength } = require('buffer');
const express = require ('express');
const router = express.Router();
const controller = require("../controller/booksCtrl.js");


// const controller = require("../controller/usersCtrl.js");

//list users 
// router.get("/allusers", controller.allusers)

//list all books list
router.get("/books", controller.allBooks)

//list books
router.get("/books/:id", controller.booksById)
// router.get("/title", controller.title)

//edit
router.put("/books/:id", controller.editBookById)

//add
router.post("/books", controller.addBook)

//delete
router.delete("/books/:id", controller.deleteBook)

module.exports = router;