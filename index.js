
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const booksRoute = require("./routes/books");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");

const expressApp = express();
const port = process.env.PORT || 3001;

expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(express.json());
expressApp.use(cors());
expressApp.use(booksRoute);
expressApp.use(usersRoute);
expressApp.use(authRoute);

expressApp.get("/", function (_, response) {
  response.send("Express App running!");
});

expressApp.listen(port, function () {
  console.log(`Express App running on port ${port}`);
});