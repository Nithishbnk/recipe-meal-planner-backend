const express = require("express");
const dotenv = require("dotenv");
const recipeRoutes = require("./routes/recipeRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/users", require("./routes/userRoutes"));

module.exports = app;
