const express = require('express')
const bodyParser = require("body-parser");
const app = express()

require("dotenv").config();
const PORT = process.env.PORT


app.use(bodyParser.json());
app.get('/', (req, res) => res.send('default route'));
app.use(require("./routes/books"));


app.listen(PORT, () => {
  console.log('app is listening on:', PORT)
});