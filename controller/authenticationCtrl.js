const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { deleteBook } = require('./controller/booksCtrl');
const jwtSecret = "this is the secret"