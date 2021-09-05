const express = require ('express')
const router = express.Router()
const booksController = require('../controllers/books')
const { authenticateJwtToken } = require("../controllers/auth");

router.get('/', booksController.getAllBooks)

router.get('/:id', booksController.getBookById)

router.post('/', booksController.createBook)


module.exports = router;