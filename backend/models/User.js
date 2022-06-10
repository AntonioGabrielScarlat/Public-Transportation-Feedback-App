const db = require("../config/db");
const Sequelize = require("sequelize");

const User = db.define(
  "user",
  {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    // isAdmin: {
    //   type: Sequelize.BOOLEAN,
    //   defaultValue: false,
    // },
  },
  { timestamps: true }
);

module.exports = User;
