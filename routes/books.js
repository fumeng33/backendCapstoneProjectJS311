const { kMaxLength } = require('buffer');
const express = require ('express');
const router = express.Router();
const controller = require("../controller/booksCtrl.js");

//list all books list
router.get("/allBooks", controller.allBooks)

//list books
router.get("/books/:id", controller.booksById)
router.get("/genre", controller.genre)
// router.get("/titles", controller.titles)
router.get("/authors", controller.authors)

//edit
router.put("/books/:id", controller.editBookById)

//add
router.post("/books", controller.addBook)

//delete
router.delete("/books/:id", controller.deleteBook)

module.exports = router;