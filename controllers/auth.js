// const mysql = require("mysql");
// const jwt = require("jsonwebtoken");
// // const bcrypt = require("bcrypt");
// const { getUserByEmail, createUser } = require("./users");


// function signIn(req, res) {
//   const { email, password } = req.body;
//   console.log(email + password + "this is the back-end");

//   function getUserByEmail(email) {
//     const user = find(users, { email });
  
//     if (!user) {
//       return null;
//     }
  
//     return user;
//   }

//   if (!user || !comparePasswords(password, user.password)) {
//     response.status(400).send("incorrect email or password");
//     return;
//   }
//   const token = generateJwtToke(user.id);
//   response.json({ token });
// }

// function signUp(req, res) {
//   const { email, password, name } = req.body;

//   const user = getUserByEmail(email);

//   if (user) {
//     response.status(400).send("email already used");
//     return;
//   }

//   const encryptedPassword = encryptPassword(password);
//   const newUser = createUser(email, encryptedPassword, name);
//   const token = generateJwtToke(newUser.id);
//   response.json({ token });
// }

// //middleware
// function authenticateJwtToken(req, response, next) {
//   const { authorization } = req.headers;
//   const token = authorization && authorization.split(" ")[1];

//   if (!token) {
//     response.status(401).send("Token missing");
//     return;
//   }

//   jwt.verify(token, process.env.JWT_SECRET, function (error, user) {
//     if (error) {
//       response.status(403).send("Invalid token");
//       return;
//     }

//     req.user = user;

//     next();
//   });

//   next();
// }

// // helper functions
// function comparePasswords(plainTextPassword, encryptedPassword) {
//   const areEqual = bcrypt.compareSync(plainTextPassword, encryptedPassword);
//   return areEqual;
// }

// // function encryptPassword(plainTextPassword) {
// //   const salt = bcrypt.genSaltSync(10);
// //   const hash = bcrypt.hashSync(plainTextPassword, salt);
// //   return hash;
// // }

// function generateJwtToke(id) {
//   const token = jwt.sign({ id }, process.env.JWT_SECRET);
//   return token;
// }

// module.exports = { signIn, signUp, authenticateJwtToken };