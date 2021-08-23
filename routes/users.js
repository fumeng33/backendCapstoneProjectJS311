const router = require("express").Router();
const { getUserById } = require("../controllers/users");
const { authenticateJwtToken } = require("../controllers/auth");

router.route("/user").get(authenticateJwtToken, getUserById);

module.exports = router;