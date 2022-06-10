const db = require("../config/db");

const dbController = {
  reset: (req, res) => {
    db.sync({ alter: true })
      .then(() => {
        res.status(201).send({
          message: "Database reset",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Database reset error",
          err: err.message,
        });
      });
  },
};

module.exports = dbController;
