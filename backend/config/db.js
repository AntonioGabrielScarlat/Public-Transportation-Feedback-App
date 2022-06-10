const Sequelize = require("sequelize");

const sequelize = new Sequelize("proiect_tx", "root", "", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: true,
  },
});

module.exports = sequelize;
