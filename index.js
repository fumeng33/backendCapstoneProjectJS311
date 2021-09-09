
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require('helmet')
const morgan = require('morgan')
const booksRouter = require("./routers/books");
const usersRouter = require("./routers/users");
const bodyParser = require('body-parser')
const authRouter = require("./routers/auth");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());
app.use(helmet());

// app.use(morgan('combined'))

app.use( '/books', booksRouter)
app.use( '/users', usersRouter)
app.use('/auth', authRouter)


app.get('/', (req, res)=> {
  res.send('Welcome to my book API! add /books to the url to view the list of all books')
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})