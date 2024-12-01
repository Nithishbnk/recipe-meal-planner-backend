// models/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("meal_planner", "postgres", "Nithishbnk@99", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => console.log("PostgreSQL connection established successfully."))
  .catch((err) => console.error("Unable to connect to PostgreSQL:", err));

// Sync the models with the database
sequelize.sync({ alter: true });

module.exports = sequelize;
