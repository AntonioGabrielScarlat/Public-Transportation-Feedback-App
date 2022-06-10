const db = require("../config/db");
const Sequelize = require("sequelize");

const Feedback = db.define(
  "feedback",
  {
    ID_USER: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    STARTING_POINT: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    FINISHING_POINT: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    TRANSPORT_MEAN: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    DEPARTURE_TIME: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    DURATION: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    CONGESTION_LEVEL: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    OBSERVATIONS: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    SATISFACTION_LEVEL: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = Feedback;
