const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = process.env.PORT || 5000


app.use(bodyParser.json());
app.get('/', (req, res) => res.send('default route'));
app.use(require("./routes/books"));


app.listen(port, () => {
  console.log('app is listening on:', PORT)
});