const { kMaxLength } = require('buffer');
const express = require ('express');
const router = require("express").Router();
const bookController = require("../controllers/books");
const { authenticateJwtToken } = require("../controllers/auth");

router
  .route("/books")
  .get(authenticateJwtToken, bookController.getAllBooks)
  .post(authenticateJwtToken, bookController.createBook);

router
  .route("/books/:id")
  .get(authenticateJwtToken, bookController.getBookById)
  .put(authenticateJwtToken, bookController.updateBook)
  .delete(authenticateJwtToken, bookController.deleteBook);

module.exports = router;