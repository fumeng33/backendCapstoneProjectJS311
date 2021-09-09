const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM userlist", (err, rows) => {
    if (err) {
      console.error("err when creating db", err);
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  });
};

const getUserById = (req, res) => {
  let sql = "SELECT * FROM userlist WHERE id = ? ";
  sql = mysql.format(sql, [req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const updateUserById = (req, res) => {
  let sql = "UPDATE userlist SET email = ?, password = ? WHERE id =?";
  sql = mysql.format(sql, [req.body.email, req.body.password, req.params.id]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

const deleteUserById = (req, res) => {
  let sql = "DELETE FROM userlist WHERE id = ?";
  sql = mysql.format(sql, [req.params.id]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
