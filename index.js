// this is an express app
const express = require('express')

//to support parsing json
const bodyParser = require("body-parser");
const app = express()

require("dotenv").config();


app.use(bodyParser.json());
app.get('/', (req, res) => res.send('default route'));
app.use(require("./routes/books"));

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { deleteBook } = require('./controller/booksCtrl');
const jwtSecret = "this is the secret"

//the middleware function to call when processing an authorized URL
checkJwt = (req, res, next) => {
  console.log("processing JWT authentication check");

  //read the token from the header
  if(req.heaers.authorization){
  let bearer = req.headers.authorization.split(" ");
  let token = bearer[1];
  } else {
    token = null;
  }

  //if the token is not valid, there is nothing to check
  if(!token) {
    return res.status(401).send("Unauthorized!");
  }

  //verify the token
  jwt.verify(token, jwtSecret, (err, decoded) => {
    //if we get an error msg then the token is not valid 
    if(err) {
      console.log("Did not verify jwt", err);
      return res.status(401).send("Unauthorized!");
    }

    //the token is valid, store the username from the token in the request, so that it is 
    //avalible to all following this call
    console.log(decoded);
    req.username = decoded.username;
    //call the next middleware function in the chain
    next();
  });
};

/**
 * GET/ everyone
 * returns a msg to everyone, no authentication required
 */
app.get("/everyone", (req, res) => {
  res.json("Everyone can");
})

/**
 * Returns a success msg that includes the username based on the JWT Token
 * This path is only availble to authenticated users
 * 
 * GET/authOnly
 */
app.get("authOnly", checkJwt, (req, res) => {
  //return a msg that show they are logged in and tell them the username you see 
  res.json("Only the special people can, we see you as"+req.username);
})

/**
 * Generates a signed JWT token that can be used as evidence hat the user is logged in
 * POST/login -d {
 *     "username": "bob",
 *     "password": "password"
 * }
 * 
 * Returns a JWT Taken 
 */
//login call, that passes in the username and password
//if you are using a service that manages the username and passwords
//then you would not have this avalible 
app.post("login", (req, res) => {
  //note that we do not print the body, since we do not want to leak the password in our logs
  console.log("POST /login", req.body.username);

  //read the username and password from the post body
  const username = req.body.username;
  const password = req.body.password;

  //select the username, role and stored has from the db for the user passed in
  db.query("select username, password_hash, role from users where username = ? ", [username], (err, rows) => {

    //assume the password failed then log an error 
    if(err) {
      console.error("Error when querying the db", err);
    }
    //if the database returned too many rows then log the error
    if(rows.length > 1){
      console.error("Found too many rows with the username", username);
    }
    //if the database returned no rows, then log it, but its not an error
    //maybe the username never signed up with our applicaiton
    if(rows.length == 0){
      console.log("Did not find a row with the username", username);
    }

    //if query ran witout an error, and only 1 row came back,
    //then chekc the stored hash again the password provided in the request
    if(!err && rows.length == 1){
      row = rows[0];

      //get the stored hash from the database
      let hash = row.password_hash;

      //get the role from the database
      role = row.role;

      // check that the has in the datebase matches the password provided
      goodPassword = bcrypt.compareSync(password, hash);
    }

    //if the password provided is good then return 
    // a signed copy of the access token
    if(goodPassword){
      //the token should include things that you are sending back to the client
      //which include the username and role 
      //not a good idea to the sned the password or the has of the password back 
      const unsignedToken = {
        username: username,
        role: role
      };
      //sign the token using the JWT secret
      const accessToken = jwt.sign(unsignedToken, jwtSecret);
      //send the signed token back 
      res.json(accessToken);
    } else {
      //if the password provided was not good, or was not able to be verified 
      //send an unathorized msg that code back
      res.status(401).send("Unauthorized!");
    }
  });
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('app is listening on:', PORT)
});