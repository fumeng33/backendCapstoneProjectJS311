const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const { getUserByEmail, createUser } = require("./users");

function signIn(request, response) {
  const { email, password } = request.body;

  const user = getUserByEmail(email);

  if (!user || !comparePasswords(password, user.password)) {
    response.status(400).send("incorrect email or password");
    return;
  }
  const token = generateJwtToke(user.id);
  response.json({ token });
}

function signUp(request, response) {
  const { email, password, name } = request.body;

  const user = getUserByEmail(email);

  if (user) {
    response.status(400).send("email already used");
    return;
  }

  const encryptedPassword = encryptPassword(password);
  const newUser = createUser(email, encryptedPassword, name);
  const token = generateJwtToke(newUser.id);
  response.json({ token });
}

//middleware
function authenticateJwtToken(request, response, next) {
  const { authorization } = request.headers;
  const token = authorization && authorization.split(" ")[1];

  if (!token) {
    response.status(401).send("Token missing");
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, function (error, user) {
    if (error) {
      response.status(403).send("Invalid token");
      return;
    }

    request.user = user;

    next();
  });

  next();
}

// helper functions
function comparePasswords(plainTextPassword, encryptedPassword) {
  const areEqual = bcrypt.compareSync(plainTextPassword, encryptedPassword);
  return areEqual;
}

// function encryptPassword(plainTextPassword) {
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(plainTextPassword, salt);
//   return hash;
// }

function generateJwtToke(id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
}

module.exports = { signIn, signUp, authenticateJwtToken };