const { assign, filter, remove } = require("lodash");
const books = require("../db/books");

function getAllBooks(request, response) {
  const { user } = request;

  const booksByUser = filter(books, { userId: user.id });
  response.json(booksByUser);
}

function getBookById(request, response) {
  const { id } = request.params;
  const book = findBook(id);
  response.json(book);
}

function createBook(request, response) {
  const bookFromRequest = request.body;
  bookFromRequest.id = books.length + 1;

  books.push(bookFromRequest);

  response.json(books);
}

function updateBook(request, response) {
  const bookFromRequest = request.body;
  const { id } = request.params;
  const book = findBook(id);

  //prevent id to be updated
  delete bookFromRequest.id;

  assign(book, bookFromRequest);

  response.json(book);
}

function deleteBook(request, response) {
  const { id } = request.params;
  findBook(id);

  remove(books, (book) => book.id === +id);

  response.status(204).send("Book deleted");
}

function findBook(id) {
  const book = find(books, { id: +id });

  if (!book) {
    response.send(`No book found. Book Id: ${id}`);
    return;
  }

  return book;
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};