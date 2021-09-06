const express = require ('express')
const router = express.Router()
const booksController = require('../controllers/books')
// const { authenticateJwtToken } = require("../controllers/auth");

router.get('/books', booksController.getAllBooks)

router.get('/books/:id', booksController.getBookById)

router.post('/createbook', booksController.createBook)


module.exports = router;